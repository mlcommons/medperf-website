import { getClient } from '../sanity/server';
import indexQuery from '../sanity/queries';

import Layout from '../components/Layout';
import Header from '../components/Header';

const metaTitle = 'Benchmarks Sample Initiative';
const metaDescription = 'A sample initiative by ML Commons and MedPerf.';

const Benchmarks = ({ indexData }) => {
  const { siteSettings } = indexData;

  return (
    <Layout
      // preview={preview}
      slug="/benchmarks"
      title={metaTitle}
      description={metaDescription}
      image={siteSettings.seoImage}
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings} showHomeLink>
        <div className="max-w-screen-lg md:mx-auto md:grid md:grid-cols-5 md:gap-x-4">
          {/* <div className="hidden md:block md:col-start-1 pt-14">
          </div> */}
          <div className="md:col-span-3 md:col-start-2 pt-6 pb-12 md:pt-8 md:pb-16 -mt-1">
            Header Content
          </div>
        </div>

      </Header>
      <div className="p-4 relative w-full">
        <div className="max-w-screen-lg md:mx-auto md:grid md:grid-cols-5 md:gap-x-4">
          <div className="md:col-span-3 md:col-start-2 pt-6 pb-12 md:pt-8 md:pb-16 -mt-1">
            Content
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

export default Benchmarks;
