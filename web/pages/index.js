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
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h2>{siteSettings.name}</h2>
        <h4>{headline}</h4>
        {hero && (
          <div>
            <h3>{hero.title}</h3>
            <p>{hero.description}</p>
            <br />
            <br />
            <ul className="grid grid-cols-4 gap-x-4">
              {hero.roles.length > 0 && hero.roles.map((role, i) => (
                <li key={role.sectionId}>
                  <h3>{i + 1}. {role.name}</h3>
                  <p>{role.description}</p>
                  <small>{role.sectionId}</small>
                </li>
              ))}
            </ul>
          </div>
        )}
        {sections.length > 0 && sections.map((section) => (
          <section key={section.id} id={section.id}>
            <small>{section.label}</small>
            <h3>{section.title}</h3>
          </section>
        ))}
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
