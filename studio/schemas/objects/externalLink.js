export default {
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare: ({ title, url }) => {
      return {
        title: title ?? 'External Link',
        subtitle: url,
      }
    },
  },
}
