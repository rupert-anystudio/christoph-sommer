import { formatIsoDate } from './dateHelpers'

export const entryTypes = [
  'all',
  'publishedText',
  'project',
  'statement',
  'speech',
]

export const entryLabels = {
  all: ['Alle'],
  publishedText: ['Text', 'Texte'],
  project: ['Projekt', 'Projekte'],
  statement: ['Statement', 'Statements'],
  speech: ['Vortrag', 'Vorträge'],
}

export const getEntryTypeLabel = (type, variant) => {
  const labels = entryLabels[type]
  if (!labels || !labels.length) return type
  const singular = labels[0]
  const plural = labels[1]
  if (variant === 'plural' && plural) return plural
  return singular
}

export const returnPublicationProps = (publication) => {
  const {
    _type,
    issue,
    title,
    magazine,
    newspaper,
    date,
    subtitle,
    publisher,
  } = publication
  if (_type === 'magazineIssue') {
    return {
      label: magazine.title,
      href: magazine?.website?.url,
      subentries: [
        [
          {
            label: issue,
          },
          {
            label: formatIsoDate(date),
          },
        ],
      ],
    }
  }
  if (_type === 'publicationNewspaper') {
    return {
      label: newspaper.title,
      href: newspaper?.website?.url,
      subentries: [
        [
          {
            label: formatIsoDate(date),
          },
        ],
      ],
    }
  }
  if (_type === 'book') {
    return {
      label: [title, subtitle].filter(Boolean).join(' - '),
      subentries: [
        [
          {
            label: publisher?.title,
            href: publisher?.website?.url,
          },
          {
            label: formatIsoDate(date),
          },
        ],
      ],
    }
  }
  return null
}

export const entryQuery = `{
  _id,
  _type,
  title,
  categories[]{
    _key,
    ...@->{
      title,
    }
  },
  excerpt[],
  links[],
  _type == "project" => {
    timeframe,
  },
  _type in ["statement", "speech"] => {
    context,
    date,
  },
  _type == "publishedText" => {
    coAuthors[]{
      _key,
      ...@->{
        name,
        surname,
        website,
      }
    },
    publications[]{
      _type,
      _key,
      _type == "publicationNewspaper" => {
        date,
        newspaper->{
          title,
          website,
        },
      },
      _type == "magazineIssue" => {
        ...@->{
          issue,
          title,
          magazine->{
            title,
            website,
            publisher->{
              title,
              website,
            },
          },
        },
      },
      _type == "book" => {
        ...@->{
          title,
          subtitle,
          date,
          publisher->{
            title,
            website,
          },
          editors[]->,
          authors[]->,
        },
      },
    },
  },
}`
