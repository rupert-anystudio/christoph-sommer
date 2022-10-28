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
