import { BiNews } from 'react-icons/bi'

export default {
  title: 'Newspaper',
  name: 'newspaper',
  type: 'document',
  icon: BiNews,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Name',
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
      title: 'title',
      subtitle: 'website.url',
    },
  },
}
