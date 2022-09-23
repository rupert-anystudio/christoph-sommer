import { BiReceipt } from 'react-icons/bi'

export default {
  title: 'Newspaper Article',
  name: 'newspaperArticle',
  type: 'document',
  icon: BiReceipt,
  fields: [
    {
      type: 'reference',
      name: 'newspaper',
      title: 'Newspaper',
      validation: (Rule) => Rule.required(),
      to: [
        {
          type: 'newspaper',
        },
      ],
    },
    {
      type: 'date',
      name: 'date',
      title: 'Date',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
    },
  ],
  preview: {
    select: {
      title: 'newspaper.title',
      subtitle: 'date',
      media: 'image->asset',
    },
  },
}
