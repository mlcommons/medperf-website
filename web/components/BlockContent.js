import Link from 'next/link';
import { PortableText } from '@portabletext/react';

import classNames from 'classnames';
import { urlForImage } from '../sanity/helpers';

const portableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const isLocal = value?.href.startsWith('/');
      return isLocal ? (
        <Link href={value.href}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>{children}</a>
        </Link>
      ) : (
        <a href={value.href} rel="noreferrer noopener" target="_blank">
          {children}
        </a>
      );
    },
  },
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

const BlockContent = ({ content, className }) => (
  <div className={classNames({
    richTextFormatting: true,
    [className]: !!className,
  })}
  >
    <PortableText value={content} components={portableTextComponents} />
  </div>
);

export default BlockContent;
