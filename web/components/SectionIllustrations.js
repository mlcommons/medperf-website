import BenchmarkIllustration from './illustrations/BenchmarkIllustration';
import CliniciansIllustration from './illustrations/CliniciansIllustration';
import ResearchersIllustration from './illustrations/ResearchersIllustration';
import ResultsIllustration from './illustrations/ResultsIllustration';

const SectionIllustrations = ({ id, reverseColors }) => (
  <>
    {id === 'benchmark-committee' && (
      <BenchmarkIllustration />
    )}
    {id === 'researchers' && (
      <ResearchersIllustration lineFill={reverseColors && 'var(--primary-color)'} />
    )}
    {id === 'clinicians' && (
      <CliniciansIllustration />
    )}
    {id === 'results' && (
      <ResultsIllustration />
    )}
  </>
);

export default SectionIllustrations;
