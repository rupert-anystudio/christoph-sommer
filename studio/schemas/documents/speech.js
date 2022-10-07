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
      description: 'The name of this speech.',
    },
    {
      type: 'string',
      name: 'context',
      title: 'Context / Info',
    },
    {
      type: 'categories',
      name: 'categories',
      description: 'A list of categories this sppech is related to.',
    },
    {
      type: 'date',
      name: 'date',
      title: 'Date',
      description: 'The date this speech was held.',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
      description: 'A list of accompanying links for this speech.',
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
