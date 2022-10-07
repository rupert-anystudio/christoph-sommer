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
      description: 'The magazine this issue is related to.',
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
      description: 'The issue number of this magazines publication.',
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      description: 'The title of this magazine issue, if present.',
    },
    {
      type: 'date',
      name: 'date',
      title: 'Publishing date',
      description: 'The date this magazine got published.',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
      description:
        'The cover of this magazine issue. Will be used as a preview thumbnail in the frontend.',
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
