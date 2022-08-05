import Link from 'next/link';

import BenchmarkIllustration from './illustrations/BenchmarkIllustration';
import CliniciansIllustration from './illustrations/CliniciansIllustration';
import ResearchersIllustration from './illustrations/ResearchersIllustration';
import ResultsIllustration from './illustrations/ResultsIllustration';

const Hero = ({ hero }) => {
  const { title, description, roles } = hero;
  console.log('In hereo');

  return (
    <div className="max-w-screen-lg md:mx-auto border-white border-3">
      <h3 className="p-4 border-b-3 border-white font-mono text-sm">{title}</h3>
      <div className="p-4">
        <div className="md:grid md:grid-cols-2 md:gap-x-12">
          <p>{description}</p>
          <div>
            Map illustration
          </div>
        </div>
        <br />
        <br />
        <ul className="grid grid-cols-4 gap-x-12">
          {roles.length > 0 && roles.map((role, i) => (
            <li key={role.sectionId}>
              <div className="mb-8 h-32 flex items-center justify-center">
                {role.sectionId === 'benchmark-committee' && (
                  <BenchmarkIllustration />
                )}
                {role.sectionId === 'researchers' && (
                  <ResearchersIllustration />
                )}
                {role.sectionId === 'clinicians' && (
                  <CliniciansIllustration />
                )}
                {role.sectionId === 'results' && (
                  <ResultsIllustration />
                )}
              </div>
              <p className="mb-4">{i + 1}. {role.name}</p>
              <p className="mb-4">{role.description}</p>
              <Link href={`#${role.sectionId}`} scroll={false}>
                <button type="button" className="underline">Read more</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hero;
