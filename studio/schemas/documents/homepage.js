export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal admin name for homepage',
      initialValue: 'Homepage',
      readOnly: true,
    },
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Site tagline'
    },
    {
      name: 'hero',
      title: 'Hero Unit',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'roles',
          title: 'Roles',
          type: 'array',
          of: [{ type: 'role' }],
        }
      ]
    }
  ],
};