import { BiBroadcast } from 'react-icons/bi'

export default {
  title: 'Annoucement',
  name: 'annoucement',
  type: 'document',
  icon: BiBroadcast,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
      description: 'The headline of this annoucement.',
    },
    {
      type: 'contentSimple',
      name: 'content',
      title: 'Content',
      description: 'Contents of this annoucement.',
    },
    {
      type: 'date',
      name: 'date',
      title: 'Publishing Date',
      description:
        'The date this annoucement will be published. As soon as this date is reached, it will be displayed on the frontend.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
}
