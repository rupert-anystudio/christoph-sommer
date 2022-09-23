import { BiText } from 'react-icons/bi'

export default {
  title: 'Text',
  name: 'publishedText',
  type: 'document',
  icon: BiText,
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'categories',
      name: 'categories',
    },
    {
      type: 'people',
      name: 'coAuthors',
      title: 'Co-authors',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
    },
    {
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
    },
    {
      type: 'content',
      name: 'content',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
    },
  },
}
