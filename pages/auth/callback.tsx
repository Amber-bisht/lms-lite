import { useEffect } from 'react';
import { useRouter } from 'next/router';

const STORAGE_KEY = 'lite-lms-user';

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Read the hash fragment from the URL
    const hash = window.location.hash.substring(1); // Remove the '#'
    const params = new URLSearchParams(hash);
    
    const accessToken = params.get('access_token');
    const error = params.get('error');
    const errorDescription = params.get('error_description');
    const redirectTo = (router.query.redirect as string) || '/';

    if (error) {
      console.error('OAuth error:', error, errorDescription);
      // Redirect to home with error
      router.replace(`/?error=${encodeURIComponent(errorDescription || error)}`);
      return;
    }

    if (!accessToken) {
      console.error('No access token received');
      router.replace(`/?error=no_token`);
      return;
    }

    // Get user info from Supabase using the access token
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase configuration');
      router.replace('/?error=config');
      return;
    }

    // Fetch user data from Supabase
    fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'apikey': supabaseAnonKey,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then((user) => {
        // Extract user data
        const userPayload = {
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          picture: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          sub: user.id || '',
        };

        // Store in localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userPayload));
        } catch (error) {
          console.warn('Unable to persist user in localStorage', error);
        }

        // Trigger storage event to update AuthContext
        window.dispatchEvent(new StorageEvent('storage', {
          key: STORAGE_KEY,
          newValue: JSON.stringify(userPayload),
        }));

        // Redirect to the intended destination
        router.replace(redirectTo || '/');
      })
      .catch((error) => {
        console.error('Error processing OAuth callback:', error);
        router.replace(`/?error=processing`);
      });
  }, [router]);

  return (
    <div style={{
      fontFamily: 'sans-serif',
      background: '#0f172a',
      color: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '16px' }}>Completing sign in...</div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '4px solid rgba(255,255,255,0.2)',
          borderTopColor: '#38bdf8',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px',
        }}></div>
      </div>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

