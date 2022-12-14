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
      description: 'The title of this text.',
    },
    {
      type: 'publishedAt',
      name: 'publishedAt',
    },
    {
      type: 'categories',
      name: 'categories',
      description: 'A list of categories this text is related to.',
    },
    {
      type: 'people',
      name: 'coAuthors',
      title: 'Co-authors',
      description: 'A list of authors who contributed to this text.',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
      description: 'A list of accompanying links for this text.',
    },
    {
      type: 'array',
      name: 'publications',
      title: 'Publications',
      description: 'A list publications for this text.',
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
      description:
        'A shortended version this text for more digestible previews.',
    },
  ],
  orderings: [
    {
      title: 'Published at, ascending',
      name: 'publishedAtAsc',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc',
        },
      ],
    },
    {
      title: 'Published at, descending',
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
