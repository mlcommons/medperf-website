export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal admin name for Settings page',
      initialValue: 'Site Settings',
      readOnly: true,
    },
    {
      name: 'name',
      title: 'Site Name',
      type: 'string',
      description: 'Public site name',
    },
    {
      name: 'email',
      title: 'Contact email *',
      type: 'string',
      validation: (Rule) => [
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: 'email', // Error message is "Does not match email-pattern"
            invert: false, // Boolean to allow any value that does NOT match pattern
          }
        ),
        Rule.required().error('A contact email is required'),
      ],
    },
    {
      name: 'documentation',
      title: 'Documentation URL',
      type: 'url',
    },
    {
      name: 'teams',
      title: 'Teams URL',
      type: 'url',
    },
    {
      name: 'github',
      title: 'Github repository URL',
      type: 'url',
    },
    {
      name: 'privacyPolicy',
      title: 'Privacy policy URL',
      type: 'url',
    },
    {
      name: 'EULA',
      title: 'EULA URL',
      type: 'url',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Other pages will use this if not provided',
    },
  ],
};
