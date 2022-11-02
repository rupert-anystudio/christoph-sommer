import { BiBook } from 'react-icons/bi'

export default {
  title: 'Imprint Page',
  name: 'imprintPage',
  type: 'document',
  icon: BiBook,
  isSingleton: true,
  editOnly: false,
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
