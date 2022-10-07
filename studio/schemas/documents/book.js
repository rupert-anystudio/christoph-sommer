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
      description: 'The title of this book.',
    },
    {
      type: 'string',
      name: 'subtitle',
      title: 'Subtitle',
      description: 'The subtitle of this book, if present.',
    },
    {
      type: 'date',
      name: 'date',
      title: 'Publishing Date',
      description: 'The date this book got published.',
    },
    {
      type: 'reference',
      name: 'publisher',
      title: 'Publisher',
      description: 'The publisher this book got released under.',
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
      description: 'A list of editors contributing to this book.',
    },
    {
      type: 'people',
      name: 'authors',
      title: 'Authors',
      description: 'A list of authors contributing to this book.',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
      description:
        'The cover of book. Will be used as a preview thumbnail in the frontend.',
    },
    {
      type: 'string',
      name: 'isbn',
      title: 'ISBN',
      description: 'ISBN code of this book.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      publisher: 'publisher.title',
      image: 'image.asset',
    },
    prepare: ({ title, subtitle, publisher, image }) => ({
      title,
      subtitle: [subtitle, publisher].filter(Boolean).join(' - '),
      media: image,
    }),
  },
}
