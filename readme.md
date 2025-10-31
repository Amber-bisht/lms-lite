# Welcome

This repository contains a Next.js based LMS experience featuring free course listings, rich media playback, and Google OAuth sign-in.

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following keys before running the app:

```
GOOGLE_CLIENT_ID=your-google-oauth-client-id
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
MONGODB_URI=your-mongodb-connection-string
# Optional overrides:
# MONGODB_DB=lite-lmss
# GOOGLE_REDIRECT_URI=https://your-domain.com/api/login
```

> `GOOGLE_REDIRECT_URI` defaults to `<origin>/api/login` when not supplied. Remember to register whichever redirect URI you use inside the Google Cloud Console credentials for your OAuth client.

## Google Sign-In Flow

- Clicking **Login with Google** anywhere in the app redirects to `/api/login`, which completes the OAuth handshake.
- On success the API stores the user in MongoDB and mirrors the basic profile (`name`, `email`, `picture`, `sub`) into `localStorage`.
- After login, users return to their originating page automatically. Only the `/play` pages for HLS videos require signing in.

Enjoy learning!
