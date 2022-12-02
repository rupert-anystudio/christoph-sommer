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
  preview: {
    select: {
      title: 'title',
      media: 'image.asset',
    },
  },
}
