import { BiLock } from 'react-icons/bi'

export default {
  title: 'Data Privacy Page',
  name: 'privacyPage',
  type: 'document',
  icon: BiLock,
  isSingleton: true,
  editOnly: true,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'contentFull',
      name: 'content',
      title: 'Content',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
