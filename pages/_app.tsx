import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { ThemeProvider } from '../contexts/ThemeContext'
import CookieConsent from '../components/CookieConsent'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9147048330170417"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <ThemeProvider>
        <Component {...pageProps} />
        <CookieConsent />
      </ThemeProvider>
    </>
  )
}
