import { BiBuildings } from 'react-icons/bi'

export default {
  title: 'Publisher',
  name: 'publisher',
  type: 'document',
  icon: BiBuildings,
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
