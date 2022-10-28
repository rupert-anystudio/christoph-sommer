import CardGrid from './CardGrid'
import Tag from './Tag'
import PortableText from './PortableText'
import { getEntryTypeColor, getEntryTypeLabel } from '../lib/entryHelpers'
import { CardTitle, Small } from './Primitives'
import CardTags from './CardTags'
import Card from './Card'

const getEntryTags = (categories = []) =>
  (categories || []).map((c) => ({
    key: c._id,
    label: c.title,
  }))

const CardGridPortfolio = ({ portfolio = [] }) => {
  const getKey = (entry) => entry?._id ?? null

  const renderContent = (entry) => {
    const { _type, title, categories, excerpt } = entry
    const tags = getEntryTags(categories)
    return (
      <Card data-cardtype={_type}>
        <div>
          <Small>{getEntryTypeLabel(_type)}</Small>
        </div>
        <CardTitle as="h2">{title}</CardTitle>
        {tags.length > 0 && (
          <CardTags>
            {tags.map((tag) => (
              <Tag key={tag.key}>{tag.label}</Tag>
            ))}
          </CardTags>
        )}
        <PortableText value={excerpt} />
      </Card>
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
