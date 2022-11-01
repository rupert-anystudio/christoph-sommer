import { BiUser } from 'react-icons/bi'

export default {
  title: 'About',
  name: 'aboutPage',
  type: 'document',
  icon: BiUser,
  isSingleton: true,
  editOnly: true,
  fields: [
    {
      type: 'contentSimple',
      name: 'missionStatement',
      title: 'Mission Statement',
      description: 'A text describing your general goal as a scientist.',
    },
    {
      type: 'contentSimple',
      name: 'aboutText',
      title: 'About Text',
      description: 'A text describing yourself as a person.',
    },
  ],
  preview: {
    prepare: () => ({
      title: 'About',
    }),
  },
}
