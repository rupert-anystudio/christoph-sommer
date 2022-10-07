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
      description: 'The name of this newspaper.',
    },
    {
      type: 'externalLink',
      name: 'website',
      title: 'Website',
      description: 'The website related to this newspaper.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'website.url',
    },
  },
}
