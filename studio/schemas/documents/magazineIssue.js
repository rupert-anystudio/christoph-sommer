import { BiHash } from 'react-icons/bi'

export default {
  title: 'Magazine Issue',
  name: 'magazineIssue',
  type: 'document',
  icon: BiHash,
  fields: [
    {
      type: 'reference',
      name: 'magazine',
      title: 'Magazine',
      validation: (Rule) => Rule.required(),
      to: [
        {
          type: 'magazine',
        },
      ],
    },
    {
      type: 'string',
      name: 'issue',
      title: 'Issue',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'date',
      name: 'date',
      title: 'Date',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
    },
  ],
  preview: {
    select: {
      magazine: 'magazine.title',
      title: 'title',
      issue: 'issue',
      image: 'image.asset',
    },
    prepare: ({ magazine, issue, title, image }) => ({
      title: magazine,
      subtitle: [title, issue].filter(Boolean).join(' - '),
      media: image,
    }),
  },
}
