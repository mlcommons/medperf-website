import { PortableText } from '@portabletext/react';

import { getClient } from '../sanity/server';
import { benchmarkSampleQuery } from '../sanity/queries';
import { urlForImage, usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const portableTextComponents = {
  types: {
    asset: ({ value }) => (
      <figure>
        <img src={urlForImage(value)} alt={value.alt} />
        <figcaption className="mt-2">{value.alt}</figcaption>
      </figure>
    ),
    code: ({ value }) => (
      <div className="border">
        {value.filename && (
          <div className="bg-primary border-b p-4 text-sm">
            {value.filename}
          </div>
        )}
        <pre className="bg-light-gray p-4">
          <code className="text-sm">{value.code}</code>
        </pre>
      </div>
    ),
  },
};

const Benchmarks = ({ benchmarkData, preview }) => {
  const { data } = usePreviewSubscription(benchmarkSampleQuery, {
    initialData: benchmarkData,
    enabled: preview,
  });

  if (!benchmarkData) {
    return (
      <Layout>
        <h2>Could not fetch benchmark sample information</h2>
      </Layout>
    );
  }
  const {
    headline,
    text,
    seo,
    siteSettings,
  } = data;

  return (
    <Layout
      preview={preview}
      slug="/benchmarks"
      title={headline}
      description={seo.description || siteSettings.seoDescription}
      image={seo.openGraphImage || siteSettings.seoImage}
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings} showHomeLink>
        <div className="max-w-screen-lg md:mx-auto md:grid md:grid-cols-5 md:gap-x-4">
          <div className="md:col-span-3 md:col-start-2 pt-16 md:pt-24">
            <small className="text-sm font-mono mb-1">
              Benchmark Initiative
            </small>
            <h1 className="h2">
              {headline}
            </h1>
          </div>
        </div>

      </Header>
      <div className="p-4 relative w-full">
        <div className="max-w-screen-lg md:mx-auto md:grid md:grid-cols-5 md:gap-x-4">
          <div className="md:col-span-3 md:col-start-2 pt-6 pb-12 md:pt-8 md:pb-16 -mt-1">
            <div className="richTextFormatting">
              <PortableText value={text} components={portableTextComponents} />
            </div>
          </div>
        </div>
      </div>
      <Footer siteSettings={siteSettings} />
    </Layout>

  );
};

export async function getStaticProps({ preview = false }) {
  const benchmarkData = await getClient(preview).fetch(benchmarkSampleQuery);
  return {
    props: {
      benchmarkData,
      preview,
    },
  };
}

export default Benchmarks;
