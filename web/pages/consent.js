import { useRouter } from 'next/router';
import { useState } from 'react';
import { getClient } from '../sanity/server';
import { siteSettingsQuery } from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN;

const Index = ({ siteData, preview }) => {
  const router = useRouter();
  // logic for the consent button
  const [isChecked, setIsChecked] = useState(false);
  const [cssClass, setCssClass] = useState('disabled:opacity-25');

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setCssClass('cursor-pointer');
    } else {
      setCssClass('disabled:opacity-25');
    }
  };
  //
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

  // Constructing the auth URL for POST
  const state = router.query.state || '';
  const targetUrl = `https://${authDomain}/continue?state=${state}`;

  return (
    <Layout
      preview={preview}
      slug="/consent"
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings} showHomeLink />
      <div className="w-full py-16 bg-primary h-full text-center">
        <div className="text-large max-w-screen-lg md:mx-auto justify-center">
          <h1 className="h2">Welcome!</h1>
        </div>
        <div className="py-16">
          <p className="p-2"> Before using MedPerf, please read and agree to the terms outlined in the End-User License Agreement (EULA). </p>
          <a href={siteSettings.EULA} target="_blank" rel="noreferrer" className="justify-self-start underline"> Click here to view the EULA </a>
          <form action={targetUrl} method="post">

            <label htmlFor="confirm">
              <input id="confirm" type="checkbox" name="confirm" value="yes" className="cursor-pointer" onChange={handleCheckboxChange} />
              <t /> By checking this box, I am agreeing to the End-user license agreement (EULA)
            </label>
            <br />
            <br />

            <input type="submit" className={`rounded border border-black bg-white p-1 ${cssClass}`} value="Continue" disabled={!isChecked} />

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
