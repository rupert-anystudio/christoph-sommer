import { BiError } from 'react-icons/bi'

export default {
  title: '404 Page',
  name: 'notFoundPage',
  type: 'document',
  icon: BiError,
  isSingleton: true,
  editOnly: true,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'contentFull',
      name: 'content',
      title: 'Content',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
