import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import classNames from 'classnames';

import { urlForImage } from '../sanity/helpers';

import SectionIllustrations from './SectionIllustrations';

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
      <h3 className="h2">{section.title}</h3>
      <div className="richTextFormatting">
        <PortableText value={section.text} />
      </div>
      {section.richContent?.map((content) => (
        <>
          {content._type === 'calloutBox' && (
            <div className="bg-primary p-4 mt-4">
              <p className="text-sm mb-2">{content.title}</p>
              <div className="flex flex-col md:flex-row-reverse space-y-4 md:space-y-0">
                <div className="relative h-16 md:h-24 w-28 shrink-0">
                  <Image
                    src={urlForImage(content.image).width(300).url()}
                    layout="fill"
                    sizes="15rem"
                    width={150}
                    height={150}
                    className="object-contain object-left md:object-right-top"
                  />
                </div>
                <div className="richTextFormatting md:mr-6">
                  <PortableText value={content.text} />
                </div>
              </div>
            </div>
          )}
          {content._type === 'callToAction' && (
            <div className="font-mono text-dark-gray">
              Call to action section
            </div>
          )}
          {content._type === 'resultsMap' && (
            <div className="font-mono text-dark-gray">
              Results map
            </div>
          )}
        </>
      ))}
    </div>
  </section>
);

export default Section;
