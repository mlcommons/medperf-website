import Head from 'next/head';

import { urlForImage } from '../sanity/helpers';

const Layout = ({
  preview,
  slug,
  title = '',
  description = '',
  image,
  siteName,
  children,
}) => {
  const siteTitle = siteName || process.env.NEXT_PUBLIC_PROJECT_NAME || '';

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
        <div className="absolute top-4 left-0 flex flex-col text-center pl-4 w-full gap-x-4 border-b border-blue text-blue pb-4">
          <h2>Preview Mode</h2>
          <a href={`/api/exit-preview?document=${slug}`} className="underline">
            Exit Preview
          </a>
        </div>
      )}
      <div className="w-full flex flex-col items-center h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;
