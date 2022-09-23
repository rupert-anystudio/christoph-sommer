import { BiFlag } from 'react-icons/bi'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: BiFlag,
  fields: [
    {
      type: 'title',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'categories',
      name: 'categories',
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
    {
      type: 'image',
      name: 'image',
      title: 'Image',
    },
    {
      type: 'doiLink',
      name: 'doiLink',
      title: 'DOI Link',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
    },
    {
      type: 'timeframe',
      name: 'timeframe',
      title: 'Timeframe',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
    },
  },
}
