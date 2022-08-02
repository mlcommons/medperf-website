import Head from 'next/head';

import { urlForImage } from '../sanity/helpers';

const siteTitle = process.env.NEXT_PUBLIC_PROJECT_NAME || '';

const Layout = ({
  preview,
  slug,
  title = '',
  description = '',
  image,
  children,
}) => {
  const fullTitle = `${title}${title && ' | '}${siteTitle}`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta property="og:title" key="og_title" content={fullTitle} />
        {description && (
          <>
            <meta name="description" key="description" content={description} />
            <meta property="og:description" key="og_description" content={description} />
          </>
        )}
        {image && (
          <meta property="og:image" content={urlForImage(image).width(1200).quality(100).url()} />
        )}
      </Head>
      {preview && (
        <div className="absolute top-4 left-0 flex flex-col items-center w-full gap-x-4 border-b border-lime-500 pb-4">
          <h2>Preview Mode</h2>
          <a href={`/api/exit-preview?document=${slug}`} className="underline">
            Exit Preview
          </a>
        </div>
      )}
      {children}
    </>
  );
};

export default Layout;
