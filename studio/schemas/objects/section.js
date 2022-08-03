export default {
  name: 'section',
  title: 'Section',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'This should be formatted as a string with no spaces to match a section ID above, e.g. `benchmark-committee`. This will help jump users down to this section, and also determine which illustration to show.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    },
    {
      name: 'richContent',
      title: 'Custom Content',
      type: 'array',
      of: [
        { type: 'calloutBox' },
        { type: 'callToAction' },
        { type: 'resultsMap' },
      ],
    }
  ],
  preview: {
    select: {
      label: 'label',
      id: 'id',
      text: 'text',
    },
    prepare({ label, id, text }) {
      const blockContent = (text || []).find(block => block._type === 'block');
      return {
        title: `${label} (#${id})`,
        subtitle: blockContent
          ? blockContent.children
            .filter(child => child._type === 'span')
            .map(span => span.text)
            .join('')
          : '',
      }
    }
  }
}
