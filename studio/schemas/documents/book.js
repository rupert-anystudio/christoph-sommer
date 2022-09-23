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
      type: 'string',
      name: 'subtitle',
      title: 'Subtitle',
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
