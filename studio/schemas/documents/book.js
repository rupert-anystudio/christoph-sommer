import { BiBook } from 'react-icons/bi'

export default {
  title: 'Book',
  name: 'book',
  type: 'document',
  icon: BiBook,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'date',
      name: 'date',
      title: 'Publishing Date',
    },
    {
      type: 'reference',
      name: 'publisher',
      title: 'Publisher',
      to: [
        {
          type: 'publisher',
        },
      ],
    },
    {
      type: 'people',
      name: 'editors',
      title: 'Editors',
    },
    {
      type: 'people',
      name: 'authors',
      title: 'Authors',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
    },
    {
      type: 'string',
      name: 'isbn',
      title: 'ISBN',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publisher.title',
    },
  },
}
