import Head from 'next/head';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Auth0Provider } from '@auth0/auth0-react';

import '../styles/fonts.css';
import '../styles/globals.css';
import '../styles/news.css';

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-NLH7WG6' });
  }, []);

  return (
    <Auth0Provider
      domain="dev-5xl8y6uuc2hig2ly.us.auth0.com"
      clientId="ZZub3F876aFJjcKTVH4hMpEVGpZtpNAJ"
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' && `${window.location.origin}/callback`,
        scope: '', // auth0 uses the union of scopes provided here and in login request
      }}
    >
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#CCEBD4" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="theme-color" content="#CCEBD4" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Auth0Provider>
  );
};

export default MyApp;
