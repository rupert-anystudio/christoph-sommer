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
      description: 'The name of this statement.',
    },
    {
      type: 'string',
      name: 'context',
      title: 'Context / Info',
    },
    {
      type: 'categories',
      name: 'categories',
      description: 'A list of categories this statement is related to.',
    },
    {
      type: 'date',
      name: 'date',
      title: 'Date',
      description: 'The date this statement got made.',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
      description: 'A list of accompanying links for this statement.',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
      description: 'Will be used as a preview thumbnail in the frontend.',
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
