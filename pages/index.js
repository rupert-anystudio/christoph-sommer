import { getClient } from '../lib/sanity.server'
import CardGrid, { CardTags, CardTitle } from '../components/CardGrid'
import Tag from '../components/Tag'
import { PortableText } from '@portabletext/react'

const getTypeColor = (_type) => {
  if (_type === 'publishedText') return 'blue'
  if (_type === 'project') return 'green'
  if (_type === 'statement') return 'teal'
  if (_type === 'speech') return 'orange'
  return 'darkgrey'
}

const getTypeLabel = (_type) => {
  if (_type === 'publishedText') return 'Text'
  if (_type === 'project') return 'Projekt'
  if (_type === 'statement') return 'Statement'
  if (_type === 'speech') return 'Vortrag'
  return _type
}

const getEntryTags = ({ categories, _type }) => {
  const color = getTypeColor(_type)
  const typeTag = {
    key: 'typeTag',
    label: getTypeLabel(_type),
    color,
  }
  const otherTags = (categories ?? []).map((c) => ({
    key: c._id,
    label: c.title,
    color,
  }))
  return [typeTag, ...otherTags]
}

const getKey = (entry) => entry?._id ?? null

const renderContent = (entry) => {
  const tags = getEntryTags(entry)
  return (
    <>
      <CardTags>
        {tags.map((tag) => (
          <Tag key={tag.key} style={{ backgroundColor: tag.color }}>
            {tag.label}
          </Tag>
        ))}
      </CardTags>
      <CardTitle>{entry?.title}</CardTitle>
      <PortableText value={entry?.excerpt} />
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
    `*[_type in ["publishedText", "project", "statement", "speech", ""]]{
      _id,
      _type,
      title,
      categories[]->{ title, _id },
      defined(excerpt) => {
        excerpt,
      },
    }`
  )
  return {
    revalidate: 10,
    props: {
      preview,
      portfolio,
    },
  }
}
