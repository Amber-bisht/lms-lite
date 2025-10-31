import type { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import { TLSSocket } from 'tls';
import clientPromise from '../../lib/mongodb';

const STORAGE_KEY = 'lite-lms-user';

const getEnv = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Missing Google OAuth credentials. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.');
  }
  return { clientId, clientSecret };
};

const getOrigin = (req: NextApiRequest) => {
  if (process.env.GOOGLE_REDIRECT_URI) {
    const provided = new URL(process.env.GOOGLE_REDIRECT_URI);
    return `${provided.protocol}//${provided.host}`;
  }

  const protoHeader = (req.headers['x-forwarded-proto'] || req.headers['x-forwarded-protocol']) as string | undefined;
  const protocolHeader = protoHeader?.split(',')[0]?.toLowerCase();
  const isTlsSocket = req.socket instanceof TLSSocket && req.socket.encrypted === true;
  const protocol = protocolHeader || (isTlsSocket ? 'https' : 'http');
  const host = req.headers['x-forwarded-host'] || req.headers.host;

  if (!host) {
    throw new Error('Cannot determine request host. Provide GOOGLE_REDIRECT_URI.');
  }

  return `${protocol}://${host}`;
};

const encodeState = (state: object) => Buffer.from(JSON.stringify(state)).toString('base64url');

const decodeState = <T,>(value: string | string[] | undefined): T | null => {
  if (!value || Array.isArray(value)) return null;
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T;
  } catch (error) {
    console.error('Failed to decode OAuth state', error);
    return null;
  }
};

const sanitizeRedirect = (redirect: unknown) => {
  if (!redirect || typeof redirect !== 'string') {
    return '/';
  }

  if (redirect.startsWith('http://') || redirect.startsWith('https://')) {
    return '/';
  }

  if (!redirect.startsWith('/')) {
    return `/${redirect}`;
  }

  return redirect;
};

const buildCallbackHtml = (userPayload: { name: string; email: string; picture?: string | null; sub: string }, redirectTo: string) => {
  const safeRedirect = redirectTo || '/';
  const script = `
    (function(){
      var data = ${JSON.stringify(userPayload)};
      try {
        localStorage.setItem('${STORAGE_KEY}', JSON.stringify(data));
      } catch (error) {
        console.warn('Unable to persist user in localStorage', error);
      }
      var redirectUrl = ${JSON.stringify(safeRedirect)};
      if (!redirectUrl || typeof redirectUrl !== 'string') {
        redirectUrl = '/';
      }
      window.location.replace(redirectUrl);
    })();
  `;

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Signing you in...</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body style="font-family: sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh;">
      <div style="text-align: center;">
        <div style="margin-bottom: 16px;">Authenticating with Google…</div>
        <div style="width: 48px; height: 48px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.2); border-top-color: #38bdf8; animation: spin 1s linear infinite; margin: 0 auto 16px;"></div>
        <noscript>
          JavaScript is required to complete the sign in. Please enable it and try again.
        </noscript>
      </div>
      <style>
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
      <script>${script}</script>
    </body>
  </html>`;
};

type OAuthState = {
  redirect?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { clientId, clientSecret } = getEnv();

    const origin = getOrigin(req);
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${origin}/api/login`;

    const oauthClient = new OAuth2Client({ clientId, clientSecret, redirectUri });

    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { code, state, error, redirect } = req.query;

    if (error) {
      console.error('Google OAuth error', error);
      return res.status(400).send('Authentication failed. Please try again.');
    }

    if (!code) {
      const redirectTarget = sanitizeRedirect(typeof redirect === 'string' ? redirect : req.headers.referer || '/');
      const statePayload: OAuthState = { redirect: redirectTarget };
      const authUrl = oauthClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['openid', 'profile', 'email'],
        prompt: 'consent',
        state: encodeState(statePayload),
      });
      return res.redirect(authUrl);
    }

    if (Array.isArray(code)) {
      return res.status(400).send('Invalid authorization code.');
    }

    const decodedState = decodeState<OAuthState>(state);
    const redirectTarget = sanitizeRedirect(decodedState?.redirect);

    const { tokens } = await oauthClient.getToken(code);
    oauthClient.setCredentials(tokens);

    if (!tokens.access_token) {
      return res.status(400).send('Unable to retrieve access token.');
    }

    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!profileResponse.ok) {
      console.error('Failed to fetch Google user info', await profileResponse.text());
      return res.status(502).send('Failed to fetch user profile from Google.');
    }

    const profile = await profileResponse.json() as {
      sub: string;
      email: string;
      name: string;
      picture?: string;
      given_name?: string;
      family_name?: string;
    };

    if (!profile?.sub || !profile?.email) {
      return res.status(500).send('Unable to retrieve user profile.');
    }

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || process.env.MONGODB_DB_NAME;
    const db = dbName ? client.db(dbName) : client.db();
    const usersCollection = db.collection('users');

    const now = new Date();
    await usersCollection.updateOne(
      { sub: profile.sub },
      {
        $set: {
          sub: profile.sub,
          email: profile.email,
          name: profile.name,
          picture: profile.picture ?? null,
          givenName: profile.given_name ?? null,
          familyName: profile.family_name ?? null,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );

    const responseHtml = buildCallbackHtml(
      {
        name: profile.name,
        email: profile.email,
        picture: profile.picture ?? null,
        sub: profile.sub,
      },
      redirectTarget
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(responseHtml);
  } catch (err) {
    console.error('Unexpected error during login', err);
    return res.status(500).send('Unexpected error during login.');
  }
}

