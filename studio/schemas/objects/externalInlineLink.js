export default {
  name: 'externalInlineLink',
  title: 'External Link',
  type: 'object',
  fields: [
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['https', 'mailto'],
        }),
      description: 'The URL this link is pointing to.',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    prepare: ({ url }) => {
      return {
        title: 'External Link',
        subtitle: url,
      }
    },
  },
}
