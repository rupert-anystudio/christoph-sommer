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
      description: 'The name of this publisher.',
    },
    {
      type: 'externalLink',
      name: 'website',
      title: 'Website',
      description: 'The website related to this publisher.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'website.url',
    },
  },
}
