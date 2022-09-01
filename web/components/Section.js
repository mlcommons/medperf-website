import Image from 'next/image';
import { Fragment } from 'react';
import classNames from 'classnames';

import { urlForImage } from '../sanity/helpers';

import SectionIllustrations from './SectionIllustrations';
import BlockContent from './BlockContent';

const Section = ({ section, i }) => (
  <section
    key={section.id}
    id={section.id}
    className="md:grid md:grid-cols-5 md:gap-x-4"
  >
    <div className="hidden md:block md:col-start-1 pt-14">
      <SectionIllustrations id={section.id} reverseColors />
    </div>
    <div className={classNames({
      'md:col-span-3 md:col-start-2 pt-6 pb-12 md:pt-8 md:pb-16 -mt-1': true,
      'border-t border-black': i !== 0,
    })}
    >
      <div className="mb-1">
        <small>{section.label}</small>
      </div>
      <div className="flex space-x-4">
        <h2 className="h2">{section.title}</h2>
        <div className="block md:hidden -mt-0.5">
          <SectionIllustrations id={section.id} reverseColors className="w-20 h-auto" />
        </div>
      </div>
      <BlockContent content={section.text} />
      {section.richContent?.map((content) => (
        <Fragment key={content._key}>
          {content._type === 'calloutBox' && (
            <div className="bg-primary p-4 mt-6">
              <p className="text-sm mb-2">{content.title}</p>
              <div className="flex flex-col md:flex-row-reverse space-y-4 md:space-y-0">
                {content.image?.asset && (
                  <div className="relative h-16 md:h-24 w-28 shrink-0">
                    <Image
                      src={urlForImage(content.image).width(300).url()}
                      layout="fill"
                      sizes="15rem"
                      alt={content.image?.alt}
                      className="object-contain object-left md:object-right-top"
                    />
                  </div>
                )}
                <BlockContent content={content.text} className="md:mr-6" />
              </div>
            </div>
          )}
          {content._type === 'callToAction' && (
            <div className="mt-6">
              <p className="mb-6">
                {content.text}
              </p>
              <a href={content.link} className="button">{content.buttonText}</a>
            </div>
          )}
          {content._type === 'resultsMap' && (
            <div className="border">
              <div className="bg-primary font-mono text-sm p-4 pr-16 border-b">
                {content.title}
              </div>
              <div className="bg-light-gray p-4">
                {content.description && (
                  <div className="text-sm mb-4 whitespace-pre-wrap">
                    {content.description}
                  </div>
                )}
                <div className="font-mono text-sm text-dark-gray">
                  &lt;Results map&gt;
                </div>
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  </section>
);

export default Section;
