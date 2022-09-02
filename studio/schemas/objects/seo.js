export default {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'openGraphImage',
      title: 'OpenGraph Image',
      type: 'image',
      description: 'Recommended size is 1200x630. No larger than 1mb.',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    },
  ],
};
