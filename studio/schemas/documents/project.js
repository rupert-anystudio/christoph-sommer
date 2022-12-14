import { BiFlag } from 'react-icons/bi'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: BiFlag,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      description: 'The name of this project.',
    },
    {
      type: 'publishedAt',
      name: 'publishedAt',
    },
    {
      type: 'categories',
      name: 'categories',
      description: 'A list of categories this project is related to.',
    },
    {
      type: 'timeframe',
      name: 'timeframe',
      title: 'Timeframe',
      description: 'The timeframe this project is happening in.',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
      description: 'A list of accompanying links for this project.',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
      description:
        'The cover image for this project. Will be used as a preview thumbnail in the frontend.',
    },
    {
      type: 'contentSimple',
      name: 'excerpt',
      title: 'Excerpt',
      description:
        'A shortended version of the actual content for more digestible previews.',
    },
  ],
  orderings: [
    {
      title: 'Published at, ascending',
      name: 'publishedAtAsc',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc',
        },
      ],
    },
    {
      title: 'Published at, descending',
      name: 'publishedAtDesc',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      imageAsset: 'image.asset',
    },
    prepare: ({ title, publishedAt, imageAsset }) => {
      return {
        title,
        subtitle: ['Project', publishedAt].join(' - '),
        media: imageAsset,
      }
    },
  },
}
