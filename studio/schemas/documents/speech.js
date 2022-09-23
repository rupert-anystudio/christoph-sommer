import { BiUserVoice } from 'react-icons/bi'

export default {
  title: 'Speech',
  name: 'speech',
  type: 'document',
  icon: BiUserVoice,
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
      type: 'date',
      name: 'date',
      title: 'Date',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
    },
    {
      type: 'text',
      name: 'context',
      title: 'Context / Info',
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
