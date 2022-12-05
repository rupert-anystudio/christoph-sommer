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

export const returnPublicationProps = (p) => {
  const { issue, title, magazine, newspaper, date, subtitle } = p
  if (p._type === 'magazineIssue') {
    return {
      value: [magazine.title, title].filter(Boolean).join(' - '),
      date: issue,
      url: magazine?.website?.url,
    }
  }
  if (p._type === 'publicationNewspaper') {
    return {
      value: newspaper.title,
      date: date,
      url: newspaper?.website?.url,
    }
  }
  if (p._type === 'book') {
    return {
      value: [title, subtitle].filter(Boolean).join(' - '),
      date: date,
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
