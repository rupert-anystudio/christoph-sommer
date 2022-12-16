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
      type: 'publishedAt',
      name: 'publishedAt',
    },
    {
      type: 'text',
      name: 'context',
      title: 'Context / Info',
      description:
        'The context this speech was held in. This can be a place, an event or anything alike.',
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
      description:
        'A short version of this speech for more digestible previews.',
    },
  ],
  orderings: [
    {
      title: 'Published At',
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
    },
  },
}
