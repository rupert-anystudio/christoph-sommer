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
    },
    {
      type: 'categories',
      name: 'categories',
    },
    {
      type: 'timeframe',
      name: 'timeframe',
      title: 'Timeframe',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
    },
    {
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
    },
    {
      type: 'content',
      name: 'content',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
    },
  },
}
