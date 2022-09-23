import { BiMessageAltDetail } from 'react-icons/bi'

export default {
  title: 'Statement',
  name: 'statement',
  type: 'document',
  icon: BiMessageAltDetail,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'context',
      title: 'Context / Info',
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
      type: 'image',
      name: 'image',
      title: 'Image',
    },
    {
      type: 'contentSimple',
      name: 'excerpt',
      title: 'Excerpt',
    },
    {
      type: 'content',
      name: 'content',
    },
    // {
    //   name: 'video',
    //   title: 'Video',
    //   type: 'array',
    //   of: [
    //     {
    //       type: 'file',
    //       name: 'videoFile',
    //       title: 'Video File',
    //     },
    //     {
    //       type: 'url',
    //       name: 'videoUrl',
    //       title: 'Video URL',
    //     },
    //   ],
    // },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'context',
    },
  },
}
