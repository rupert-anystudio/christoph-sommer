export const entryTypes = [
  'all',
  'publishedText',
  'project',
  'statement',
  'speech',
]

export const entryLabels = {
  all: 'Alle',
  publishedText: 'Texte',
  project: 'Projekte',
  statement: 'Statements',
  speech: 'Vorträge',
}

export const getEntryTypeColor = ({ _type }) => {
  if (_type === 'publishedText') return '#193146'
  if (_type === 'project') return '#43095a'
  if (_type === 'statement') return '#0c462b'
  if (_type === 'speech') return '#48371d'
  return 'white'
}

export const getEntryTypeLabel = (_type) => {
  if (_type === 'publishedText') return 'Text'
  if (_type === 'project') return 'Projekt'
  if (_type === 'statement') return 'Statement'
  if (_type === 'speech') return 'Vortrag'
  return _type
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
