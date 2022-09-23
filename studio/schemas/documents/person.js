import { BiUser } from 'react-icons/bi'

export default {
  title: 'Person',
  name: 'person',
  type: 'document',
  icon: BiUser,
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'string',
      name: 'surname',
      title: 'Surname',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'externalLink',
      name: 'website',
      title: 'Website',
    },
  ],
  preview: {
    select: {
      name: 'name',
      surname: 'surname',
      websiteUrl: 'website.url',
    },
    prepare: ({ name, surname, websiteUrl }) => {
      return {
        title: [name, surname].filter(Boolean).join(' '),
        subtitle: websiteUrl,
        media: null,
      }
    },
  },
}
