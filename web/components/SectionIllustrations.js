import BenchmarkIllustration from './illustrations/BenchmarkIllustration';
import CliniciansIllustration from './illustrations/CliniciansIllustration';
import ResearchersIllustration from './illustrations/ResearchersIllustration';
import ResultsIllustration from './illustrations/ResultsIllustration';

const SectionIllustrations = ({ id, reverseColors, className }) => (
  <>
    {id === 'benchmark-committee' && (
      <BenchmarkIllustration className={className} />
    )}
    {id === 'researchers' && (
      <ResearchersIllustration lineFill={reverseColors && 'var(--primary-color)'} className={className} />
    )}
    {id === 'clinicians' && (
      <CliniciansIllustration className={className} />
    )}
    {id === 'results' && (
      <ResultsIllustration className={className} />
    )}
  </>
);

export default SectionIllustrations;
