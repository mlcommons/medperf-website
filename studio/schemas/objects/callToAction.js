export default {
  name: 'callToAction',
  title: 'Call to Action',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      title: 'Button Link',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel'],
      }).required(),
    },
  ],
  preview: {
    select: {
      text: 'text',
      buttonText: 'buttonText',
      link: 'link',
    },
    prepare({text, buttonText, link}) {
      return {
        title: text || '(No text)',
        subtitle: `${buttonText} - ${link ? link : 'Missing link'}`,
      };
    },
  },
};
