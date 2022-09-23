export default {
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'url',
      name: 'url',
      title: 'URL',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
}
