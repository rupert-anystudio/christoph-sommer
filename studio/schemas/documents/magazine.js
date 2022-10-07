import { BiBookOpen } from 'react-icons/bi'

export default {
  title: 'Magazine',
  name: 'magazine',
  type: 'document',
  icon: BiBookOpen,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Name',
      validation: (Rule) => Rule.required(),
      description: 'The name of this magazine.',
    },
    {
      type: 'externalLink',
      name: 'website',
      title: 'Website',
      description: 'The website related to this magazine.',
    },
    {
      type: 'reference',
      name: 'publisher',
      title: 'Publisher',
      description: 'The publisher for this magaziner.',
      to: [
        {
          type: 'publisher',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'website.url',
    },
  },
}
