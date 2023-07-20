import Link from 'next/link';
import Image from 'next/image';

import { getClient } from '../sanity/server';
import { indexQuery } from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import NewsArticle from '../components/NewsArticle';
import ArrowUp from '../components/illustrations/ArrowUp';
import Footer from '../components/Footer';

import medPerfLogo from '../public/images/medperf_logo.svg';
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
    news,
    sections,
    pageTitle,
    siteSettings,
  } = data;

  return (
    <Layout
      preview={preview}
      slug=""
      title={pageTitle}
      description={siteSettings.seoDescription}
      image={siteSettings.seoImage}
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings}>
        <div className="md:p-8">
          <div className="max-w-screen-lg mx-4 md:mx-auto py-8 md:py-8 flex flex-col space-y-4 md:space-y-8 justify-center">
            <Image src={medPerfLogo} alt={`${siteSettings.name} Logo`} priority />
            <h1 className="h2 text-center">{headline}</h1>
          </div>
        </div>
        {hero && (
          <div id="top">
            <Hero hero={hero} />
          </div>
        )}
        <div className="flex space-x-2 items-center justify-center pt-8 pb-4">
          <span className="text-sm">
            Powered by
          </span>
          <a href="https://mlcommons.org">
            <Image src={mlCommonsLogo} alt="Go to MLCommons" />
          </a>
        </div>
      </Header>
      <div className="p-4 md:p-12 relative w-full">
        <Link href="#top" scroll={false} passHref>
          <button
            type="button"
            className="hidden md:flex sticky top-8 left-full -mt-4 -mr-4 items-center space-x-2 text-sm text-dark-gray"
          >
            <ArrowUp />
            <div>Back to top</div>
          </button>
        </Link>
        <div className="recent-news page-pad">
          <h2 className="recent-news__headline col-pad col-12"><small>What’s New</small></h2>

          <ul className="posts-list grid-wrapper">
            {news.length > 0 && news.map((newsArticle) => (
              <NewsArticle newsArticle={newsArticle} key={newsArticle.id} />
            ))}
          </ul>
        </div>
        <hr />
        <div className="max-w-screen-lg md:mx-auto">
          {sections.length > 0 && sections.map((section, i) => (
            <Section section={section} i={i} key={section.id} />
          ))}
        </div>
      </div>
      <Footer siteSettings={siteSettings} />
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
