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
    },
    {
      type: 'contentSimple',
      name: 'content',
      title: 'Content',
    },
    {
      type: 'timeframe',
      name: 'timeframe',
      title: 'Timeframe',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
