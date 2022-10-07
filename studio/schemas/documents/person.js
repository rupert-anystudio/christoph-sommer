import { BiUser } from 'react-icons/bi'

export default {
  title: 'Person',
  name: 'person',
  type: 'document',
  icon: BiUser,
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
      validation: (Rule) => Rule.required(),
      description: 'The name of this person.',
    },
    {
      type: 'string',
      name: 'surname',
      title: 'Surname',
      validation: (Rule) => Rule.required(),
      description: 'The surname of this person.',
    },
    {
      type: 'externalLink',
      name: 'website',
      title: 'Website',
      description: 'The website / online persence of this person, if present.',
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
      description: 'An portrait of this person, if present.',
    },
  ],
  preview: {
    select: {
      name: 'name',
      surname: 'surname',
      websiteUrl: 'website.url',
      image: 'image.asset',
    },
    prepare: ({ name, surname, websiteUrl, image }) => {
      return {
        title: [name, surname].filter(Boolean).join(' '),
        subtitle: websiteUrl,
        media: image,
      }
    },
  },
}
