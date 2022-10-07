export default {
  name: 'doiLink',
  title: 'DOI Link',
  type: 'object',
  fields: [
    {
      type: 'url',
      name: 'url',
      title: 'URL',
      validation: (Rule) => Rule.required(),
      description: 'The actual URL of this link.',
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description:
        'If provided, will be used as the displayed value in the frontend for the link. Try to describe the links target if possible.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare: ({ title, url }) => {
      return {
        title: title ?? 'DOI Link',
        subtitle: url,
      }
    },
  },
}
