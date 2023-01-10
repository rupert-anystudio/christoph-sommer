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
      title: 'Publishing date',
      description:
        'The date this annoucement will be published at As soon as this date is reached, it will be displayed on the frontend.',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'date',
      name: 'dateUntil',
      title: 'Display until date',
      description:
        'After this date, this annoucement wont be displayed anymore.',
      validation: (Rule) => Rule.min(Rule.valueOfField('date')),
      hidden: ({ document, value }) => !value && !document?.date,
    },
  ],
  orderings: [
    {
      title: 'Publishing Date',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
}
