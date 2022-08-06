import Head from 'next/head';
import { useState } from 'react';
import { RedocStandalone } from 'redoc';

const pageTitle = 'API Documentation | MedPerf';

const Documentation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta key="og_title" property="og:title" content={pageTitle} />
      </Head>
      <RedocStandalone
        specUrl="https://medperf.org/?format=openapi"
        options={{
          lazyRendering: false,
          hideHostname: false,
          expandResponses: 'all',
          pathInMiddlePanel: false,
          nativeScrollbars: false,
          requiredPropsFirst: false,
          fetchSchemaWithQuery: true,
          hideLoading: true,
        }}
        onLoaded={(error) => {
          if (!error) {
            console.log('Yay!');
            setIsLoaded(true);
          }
        }}
      />
      {!isLoaded && (
        <div className="w-full h-screen flex items-center justify-center h2">
          Loading...
        </div>
      )}
    </>
  );
};

export default Documentation;
