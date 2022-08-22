export default {
  name: 'benchmarkSample',
  title: 'Benchmark Sample',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal admin name for benchmark sample page',
      initialValue: 'Benchmark Sample',
      readOnly: true,
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Page title',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
  ],
};
