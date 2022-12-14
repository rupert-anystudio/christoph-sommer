import { BiMessageAltDetail } from 'react-icons/bi'
import { portfolioDocumentPreview } from '../../lib/schemaHelpers'

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
      type: 'publishedAt',
      name: 'publishedAt',
    },
    {
      type: 'text',
      name: 'context',
      title: 'Context / Info',
      description:
        'The context this statement was given in. This can be a place, an event or anything alike.',
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
      description:
        'A short version of this statement for more digestible previews.',
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
  preview: portfolioDocumentPreview,
}
