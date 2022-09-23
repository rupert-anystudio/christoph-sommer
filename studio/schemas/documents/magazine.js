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
    },
    {
      type: 'externalLink',
      name: 'website',
      title: 'Website',
    },
    {
      type: 'reference',
      name: 'publisher',
      title: 'Publisher',
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
