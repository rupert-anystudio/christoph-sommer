import { getClient } from '../lib/sanity.server'
import CardGrid, { CardTitle } from '../components/CardGrid'
import Tag from '../components/Tag'

const getTypeColor = ({ _type }) => {
  if (_type === 'publishedText') return 'blue'
  if (_type === 'project') return 'green'
  if (_type === 'statement') return 'teal'
  if (_type === 'speech') return 'orange'
  return 'darkgrey'
}

const getTypeLabel = ({ _type }) => {
  if (_type === 'publishedText') return 'Text'
  if (_type === 'project') return 'Projekt'
  if (_type === 'statement') return 'Statement'
  if (_type === 'speech') return 'Vortrag'
  return _type
}

const getKey = (entry) => entry?._id ?? null

const renderContent = (entry) => {
  const typeLabel = getTypeLabel(entry)
  const typeColor = getTypeColor(entry)
  return (
    <>
      <Tag style={{ backgroundColor: typeColor }}>{typeLabel}</Tag>
      <CardTitle>{entry?.title}</CardTitle>
    </>
  )
}

export default function Home({ portfolio = [] }) {
  return (
    <>
      <CardGrid
        entries={portfolio}
        getKey={getKey}
        renderContent={renderContent}
      />
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const portfolio = await client.fetch(
    `*[_type in ["publishedText", "project", "statement", "speech", ""]]{_id, _type, title}`
  )
  return {
    revalidate: 10,
    props: {
      preview,
      portfolio,
    },
  }
}
