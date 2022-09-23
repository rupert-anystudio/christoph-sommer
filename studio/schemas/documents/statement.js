import { BiMessageAltDetail } from 'react-icons/bi'

export default {
  title: 'Statement',
  name: 'statement',
  type: 'document',
  icon: BiMessageAltDetail,
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
      name: 'context',
      title: 'Context / Info',
    },
    {
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
    },
    {
      type: 'date',
      name: 'date',
      title: 'Date',
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
      type: 'links',
      name: 'links',
      title: 'Links',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'array',
      of: [
        {
          type: 'file',
          name: 'videoFile',
          title: 'Video File',
        },
        {
          type: 'url',
          name: 'videoUrl',
          title: 'Video URL',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'context',
    },
  },
}
