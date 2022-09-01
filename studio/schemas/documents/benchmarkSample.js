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
      name: 'image',
      title: 'Team Image',
      type: 'asset',
    },
    {
      name: 'subtitle',
      title: 'Team Subtitle',
      type: 'text',
      description: 'Team name and/or subtitle beneath headline',
      rows: 2,
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO Info',
      description: 'If this is not included, this will fall back to the "Site Settings" SEO info',
    },
  ],
};
