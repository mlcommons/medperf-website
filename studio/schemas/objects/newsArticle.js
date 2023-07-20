export default {
  name: 'newsArticle',
  title: 'News Article',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'text',
      type: 'text',
    },
    {
      name: 'url',
      title: 'url',
      type: 'text',
    },
    {
      name: 'datetime',
      title: 'datetime',
      type: 'text',
    },
  ],
};
