import CardGrid, { CardTags, CardTitle } from './CardGrid'
import Tag from './Tag'
import PortableText from './PortableText'
import { getEntryTypeColor, getEntryTypeLabel } from '../lib/entryHelpers'

const getEntryTags = (entry) => {
  const color = getEntryTypeColor(entry)
  const typeTag = {
    key: 'typeTag',
    label: getEntryTypeLabel(entry),
    color,
  }
  const otherTags = (entry?.categories ?? []).map((c) => ({
    key: c._id,
    label: c.title,
    color,
  }))
  return [typeTag, ...otherTags]
}

const CardGridPortfolio = ({ portfolio = [] }) => {
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

  return (
    <CardGrid
      entries={portfolio}
      getKey={getKey}
      renderContent={renderContent}
    />
  )
}

export default CardGridPortfolio
