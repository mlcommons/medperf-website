import { useRouter } from 'next/router';
import { getClient } from '../sanity/server';
import { siteSettingsQuery } from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = ({ siteData, preview }) => {
  const router = useRouter();

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

  const state = router.query.state || '';
  const auth0Domain = 'dev-5xl8y6uuc2hig2ly.us.auth0.com';
  const targetUrl = `https://${auth0Domain}/continue?state=${state}`;
  return (
    <Layout
      preview={preview}
      slug="/consent"
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings} showHomeLink />
      <div className="w-full py-16 bg-primary h-full text-center">
        <div className="text-large max-w-screen-lg md:mx-auto justify-center">
          <h1 className="h2">Welcome! Please agree to the terms of use to continue </h1>
        </div>
        <div className="py-16">
          <p className="p-2"> This is a test page. Please check the box to proceed.</p>
          <form action={targetUrl} method="post">

            <label htmlFor="confirm">
              <input id="confirm" type="checkbox" name="confirm" value="yes" />
              I agree to the terms
            </label>
            <br />
            <br />

            <input type="submit" className="rounded border border-black bg-white p-1" value="Continue" />

          </form>

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
