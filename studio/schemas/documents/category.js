import { BiPurchaseTag } from 'react-icons/bi'

export default {
  title: 'Category',
  name: 'category',
  type: 'document',
  icon: BiPurchaseTag,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      description: 'The name of this category.',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
