export default {
  name: 'calloutBox',
  title: 'Callout Box',
  type: 'object',
  fields: [
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
      name: 'image',
      title: 'Image',
      type: 'asset',
    },
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text',
      image: 'image',
    },
    prepare({title, text, image}) {
      const blockContent = (text || []).find((block) => block._type === 'block');
      return {
        title: title,
        subtitle: blockContent
          ? blockContent.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join('')
          : '',
        media: image,
      };
    },
  },
};
