import Link from 'next/link';
import Image from 'next/image';

import { getClient } from '../sanity/server';
import indexQuery from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Section from '../components/Section';

import githubLogo from '../public/images/github_logo.svg';
import medPerfLogo from '../public/images/medperf_logo.svg';
import medPerfLogoGreen from '../public/images/medperf_logo_green.svg';
import mlCommonsLogo from '../public/images/mlc_lockup_black.svg';

const Index = ({ indexData, preview }) => {
  const { data } = usePreviewSubscription(indexQuery, {
    initialData: indexData,
    enabled: preview,
  });

  if (!indexData) {
    return (
      <Layout>
        <h2>Could not fetch homepage information</h2>
      </Layout>
    );
  }

  const {
    headline,
    hero,
    sections,
    pageTitle,
    siteSettings,
  } = data;

  return (
    <Layout
      preview={preview}
      slug=""
      description={siteSettings.seoDescription}
      image={siteSettings.seoImage}
      title={pageTitle}
      siteName={siteSettings.name}
    >
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full p-4 bg-primary">
          <div className="w-full flex items-center justify-end space-x-4 text-sm">
            <Link href="/documentation">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Documentation</a>
            </Link>
            <a href={`mailto:${siteSettings.email || 'info@medperf.org'}`}>Contact</a>
            {siteSettings.github && (
              <a href={siteSettings.github} className="w-4 h-4">
                <Image src={githubLogo} alt={`Go to ${siteSettings.name} Github Repo`} />
              </a>
            )}
          </div>
          <div className="md:p-8">
            <div className="max-w-screen-lg mx-4 md:mx-auto py-8 md:py-8 flex flex-col space-y-4 md:space-y-8 justify-center">
              <Image src={medPerfLogo} alt={`${siteSettings.name} Logo`} />
              <h2 className="h2 text-center">{headline}</h2>
            </div>
          </div>
          {hero && <Hero hero={hero} />}
          <div className="flex space-x-2 items-center justify-center pt-8 pb-4">
            <span className="text-sm">
              Powered by
            </span>
            <a href="https://mlcommons.org">
              <Image src={mlCommonsLogo} alt="Go to MLCommons" />
            </a>
          </div>
        </div>
        <div className="p-4 md:p-12">
          <div className="max-w-screen-lg md:mx-auto">
            {sections.length > 0 && sections.map((section, i) => (
              <Section section={section} i={i} key={section.id} />
            ))}
          </div>
        </div>
        <div className="w-full p-4 md:p-12 bg-light-gray">
          <div className="max-w-screen-lg md:mx-auto flex justify-between items-end">
            <div>
              <div className="w-20">
                <Image src={medPerfLogoGreen} alt={`${siteSettings.name} Logo`} />
              </div>
              <p className="text-sm text-dark-gray">
                Powered by <a href="https://mlcommons.org" className="underline">ML Commons</a>
              </p>
            </div>

            <div className="text-sm">
              &copy; 2020 - 2022 MLCommons
              <br />
              <a href="privacy" className="underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  const indexData = await getClient(preview).fetch(indexQuery);
  return {
    props: {
      indexData,
      preview,
    },
  };
}

export default Index;
