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
      type: 'date',
      name: 'date',
      title: 'Date',
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
    },
  ],
  preview: {
    select: {
      title: 'magazine.title',
      subtitle: 'issue',
    },
  },
}
