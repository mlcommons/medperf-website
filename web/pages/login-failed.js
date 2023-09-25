import Link from 'next/link';
import { getClient } from '../sanity/server';
import { siteSettingsQuery } from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = ({ siteData, preview }) => {
  const { data } = usePreviewSubscription(siteSettingsQuery, {
    initialData: siteData,
    enabled: preview,
  });

  if (!siteData) {
    return (
      <Layout>
        <h2>Could not fetch page information</h2>
      </Layout>
    );
  }

  const {
    siteSettings,
  } = data;

  return (
    <Layout
      preview={preview}
      slug="/login-failed"
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings} showHomeLink />
      <div className="w-full py-16 bg-primary h-full text-center">
        <div className="text-large max-w-screen-lg md:mx-auto justify-center">
          <h1 className="h2">Login Failed</h1>
        </div>
        <div className="py-16">
          <p className="p-2"> This could occur if your session has expired or if you have not agreed to the terms of use.</p>
          <button type="button" className="rounded border border-black bg-white p-1"><Link target="_blank" rel="noreferrer" href="/" className="p-2">Back to Home</Link></button>
        </div>

      </div>
      <Footer siteSettings={siteSettings} />

    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const siteData = await getClient(preview).fetch(siteSettingsQuery);
  return {
    props: {
      siteData,
      preview,
    },
  };
}

export default Index;
