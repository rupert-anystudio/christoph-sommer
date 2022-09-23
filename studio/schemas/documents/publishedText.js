import { BiText } from 'react-icons/bi'

export default {
  title: 'Text',
  name: 'publishedText',
  type: 'document',
  icon: BiText,
  fields: [
    {
      type: 'title',
      name: 'title',
      title: 'Title',
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
    {
      type: 'people',
      name: 'coAuthors',
      title: 'Co-authors',
    },
    {
      type: 'doiLink',
      name: 'doiLink',
      title: 'DOI Link',
    },
    {
      type: 'links',
      name: 'links',
      title: 'Links',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'tags',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
