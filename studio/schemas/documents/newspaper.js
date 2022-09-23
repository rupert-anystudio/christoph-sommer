import { BiNews } from 'react-icons/bi'

export default {
  title: 'Newspaper',
  name: 'newspaper',
  type: 'document',
  icon: BiNews,
  fields: [
    {
      type: 'title',
      name: 'title',
      title: 'Name',
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
