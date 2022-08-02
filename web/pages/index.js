import { getClient } from '../sanity/server';
import indexQuery from '../sanity/queries';
import { usePreviewSubscription } from '../sanity/helpers';

import Layout from '../components/Layout';

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
    name,
    seoDescription,
    seoImage,
  } = data;

  return (
    <Layout
      preview={preview}
      slug=""
      description={seoDescription}
      image={seoImage}
    >
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h2>Homepage</h2>
        <h2>{name}</h2>
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
