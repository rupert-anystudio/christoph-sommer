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
      description: 'The newspaper this text was published in.',
      to: [
        {
          type: 'newspaper',
        },
      ],
    },
    {
      type: 'date',
      name: 'date',
      description: 'The date this text was published in the above newspaper.',
    },
    {
      type: 'image',
      name: 'image',
      description:
        'A scan or image of this publications newspaper page. Will be used as a preview thumbnail in the frontend.',
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
