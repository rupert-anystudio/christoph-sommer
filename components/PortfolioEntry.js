import React from 'react'
import { getEntryTypeLabel, returnPublicationProps } from '../lib/entryHelpers'
import Tag from './Tag'
import PortableText from './PortableText'
import { Body, CardTitle, Small } from './Primitives'
import CardTags from './CardTags'
import Card from './Card'
import CardSection from './CardSection'
import Publication from './Publication'
// import CardToggle from './CardToggle'

const PortfolioEntry = ({
  _type,
  title,
  categories,
  excerpt,
  context,
  publications,
  coAuthors,
  onClick,
}) => {
  const tags = (categories || []).map((c) => ({
    key: c._key,
    label: c.title,
  }))
  return (
    <Card data-cardtype={_type} onClick={onClick}>
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
      {coAuthors && (
        <CardSection title={'Mit'}>
          {coAuthors.map((a) => {
            return (
              <Body key={a._key}>
                {[a.name, a.surname].filter(Boolean).join(' ')}
              </Body>
            )
          })}
        </CardSection>
      )}
      {context && (
        <CardSection title={'Kontext'}>
          <Body>{context}</Body>
        </CardSection>
      )}
      {publications && (
        <CardSection title={'Veröffentlichungen'}>
          {publications.map((p) => {
            return <Publication key={p._key} {...returnPublicationProps(p)} />
          })}
        </CardSection>
      )}
      {excerpt && (
        <CardSection>
          <PortableText value={excerpt} />
        </CardSection>
      )}
      {/* <CardToggle /> */}
    </Card>
  )
}

export default PortfolioEntry
