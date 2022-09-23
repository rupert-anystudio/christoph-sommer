import { BiText } from 'react-icons/bi'

export default {
  title: 'Text',
  name: 'publishedText',
  type: 'document',
  icon: BiText,
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
      type: 'people',
      name: 'coAuthors',
      title: 'Co-authors',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
    },
    {
      type: 'array',
      name: 'publications',
      title: 'Publications',
      of: [
        {
          type: 'publicationNewspaper',
        },
        {
          type: 'reference',
          name: 'magazineIssue',
          title: 'Magazine Issue',
          to: [{ type: 'magazineIssue' }],
        },
        {
          type: 'reference',
          name: 'book',
          title: 'Book',
          to: [{ type: 'book' }],
        },
      ],
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
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
