import { BiNews } from 'react-icons/bi'

export default {
  type: 'object',
  name: 'publicationNewspaper',
  title: 'Newspaper',
  icon: BiNews,
  fields: [
    {
      type: 'reference',
      name: 'newspaper',
      validation: (Rule) => Rule.required(),
      to: [
        {
          type: 'newspaper',
        },
      ],
    },
    {
      type: 'date',
      name: 'date',
    },
    {
      type: 'image',
      name: 'image',
    },
  ],
  preview: {
    select: {
      newspaper: 'newspaper.title',
      date: 'date',
      image: 'image.asset',
    },
    prepare: ({ newspaper, date, image }) => {
      return {
        title: newspaper,
        subtitle: date,
        media: image,
      }
    },
  },
}
