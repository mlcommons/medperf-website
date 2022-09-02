export default {
  name: 'role',
  title: 'Role',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
      description: 'This should be formatted as a string with no spaces to match a section ID below, e.g. `benchmark-committee`. This will help jump users down the page, and also determine which illustration to show.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      id: 'sectionId',
      description: 'description',
    },
    prepare({title, id, description}) {
      return {
        title: `${title} (#${id})`,
        subtitle: description,
      };
    },
  },
};
