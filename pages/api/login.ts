// Edge Runtime compatible - uses Supabase Auth
export const config = {
  runtime: 'edge',
};

import type { NextRequest } from 'next/server';

const STORAGE_KEY = 'lite-lms-user';

const getOrigin = (request: NextRequest) => {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
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

const buildCallbackHtml = (
  userPayload: { name: string; email: string; picture?: string | null; sub: string },
  redirectTo: string
) => {
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

// Pages Router Edge Runtime API route handler
export default async function handler(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response('Missing Supabase configuration', { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    const redirect = searchParams.get('redirect');

    // Handle OAuth callback from Supabase
    if (code) {
      const origin = getOrigin(request);
      const redirectTo = sanitizeRedirect(redirect || '/');
      const callbackUrl = `${origin}/api/login?redirect=${encodeURIComponent(redirectTo)}`;

      // Exchange authorization code for session
      const tokenResponse = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=authorization_code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apikey': supabaseAnonKey,
        },
        body: new URLSearchParams({
          code,
          redirect_to: callbackUrl,
        }),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('Token exchange failed:', errorText);
        return new Response('Authentication failed. Please try again.', { status: 400 });
      }

      const sessionData = await tokenResponse.json();

      // Get user information
      const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
        headers: {
          'Authorization': `Bearer ${sessionData.access_token}`,
          'apikey': supabaseAnonKey,
        },
      });

      if (!userResponse.ok) {
        return new Response('Failed to fetch user profile.', { status: 500 });
      }

      const user = await userResponse.json();

      // Extract user data
      const userPayload = {
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        picture: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        sub: user.id || '',
      };

      const responseHtml = buildCallbackHtml(userPayload, redirectTo);
      return new Response(responseHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error, errorDescription);
      return new Response(`Authentication failed: ${errorDescription || error}. Please try again.`, { status: 400 });
    }

    // Initiate OAuth flow - redirect to Supabase Google OAuth
    const origin = getOrigin(request);
    const redirectTarget = sanitizeRedirect(redirect || request.headers.get('referer') || '/');
    const callbackUrl = `${origin}/api/login?redirect=${encodeURIComponent(redirectTarget)}`;

    // Redirect to Supabase Google OAuth
    const authUrl = new URL(`${supabaseUrl}/auth/v1/authorize`);
    authUrl.searchParams.set('provider', 'google');
    authUrl.searchParams.set('redirect_to', callbackUrl);
    
    return Response.redirect(authUrl.toString());
  } catch (err) {
    console.error('Unexpected error during login', err);
    return new Response('Unexpected error during login.', { status: 500 });
  }
}
