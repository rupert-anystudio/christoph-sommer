import CardGrid from './CardGrid'
import Tag from './Tag'
import PortableText from './PortableText'
import { getEntryTypeColor, getEntryTypeLabel } from '../lib/entryHelpers'
import { Body, CardTitle, Small } from './Primitives'
import CardTags from './CardTags'
import Card from './Card'
import CardToggle from './CardToggle'
import CardSection from './CardSection'

const getEntryTags = (categories = []) =>
  (categories || []).map((c) => ({
    key: c._id,
    label: c.title,
  }))

const CardGridPortfolio = ({ portfolio = [] }) => {
  const getKey = (entry) => entry?._id ?? null

  const renderContent = (entry) => {
    const { _type, title, categories, excerpt, context } = entry
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
        {context && (
          <CardSection title={'Kontext'}>
            <Body>{context}</Body>
          </CardSection>
        )}
        <CardSection>
          <PortableText value={excerpt} />
        </CardSection>
        <CardToggle />
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
