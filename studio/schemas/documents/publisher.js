import { BiBuildings } from 'react-icons/bi'

export default {
  title: 'Publisher',
  name: 'publisher',
  type: 'document',
  icon: BiBuildings,
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
