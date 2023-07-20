import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { getClient } from '../sanity/server';
import { benchmarkSampleQuery } from '../sanity/queries';
import { urlForImage, usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlockContent from '../components/BlockContent';

const Benchmarks = ({ benchmarkData, preview }) => {
  /* TODO: Remove me to enable benchmarks again in production */
  const router = useRouter();

  const { data } = usePreviewSubscription(benchmarkSampleQuery, {
    initialData: benchmarkData,
    enabled: preview,
  });

  /* TODO: Remove me to enable benchmarks again in production */
  useEffect(() => {
    if (router.isReady && !router.query.preview
      && !preview && process.env.NEXT_PUBLIC_DISABLE_BENCHMARKS_PAGE) {
      router.push('/');
    }
  }, [preview, router]);

  if (!benchmarkData) {
    return (
      <Layout>
        <h2>Could not fetch benchmark sample information</h2>
      </Layout>
    );
  }

  const {
    headline,
    image,
    subtitle,
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
            <div className="flex space-x-4 items-center">
              {image?.asset && (
                <div className="relative h-8 md:h-12 w-20 shrink-0">
                  <Image
                    src={urlForImage(image).width(300).url()}
                    layout="fill"
                    sizes="10rem"
                    alt={image?.alt}
                    className="object-contain"
                  />
                </div>
              )}
              {subtitle && <p>{subtitle}</p>}
            </div>
          </div>
        </div>

      </Header>
      <div className="p-4 relative w-full">
        <div className="max-w-screen-lg md:mx-auto md:grid md:grid-cols-5 md:gap-x-4">
          <div className="md:col-span-3 md:col-start-2 pt-6 pb-12 md:pt-8 md:pb-16 -mt-1">
            <BlockContent content={text} />
          </div>
        </div>
      </div>
      <Footer siteSettings={siteSettings} />
    </Layout>
  );
};

export async function getStaticProps({ preview = false }) {
  // const benchmarkData = await getClient(preview).fetch(benchmarkSampleQuery);
  // return {
  //   props: {
  //     benchmarkData,
  //     preview,
  //   },
  // };
  // temporary fix to disable preview benchmarks page
  return {
    notFound: true,
  };
}

export default Benchmarks;
