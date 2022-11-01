import { BiCog } from 'react-icons/bi'

export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  icon: BiCog,
  isSingleton: true,
  editOnly: true,
  fields: [
    {
      type: 'text',
      name: 'siteDescription',
      title: 'General Site Description',
      description: 'A text describing the contents of the website in general.',
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Site Settings',
    }),
  },
}
