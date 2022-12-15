import React from 'react'
import { getEntryTypeLabel, returnPublicationProps } from '../lib/entryHelpers'
import Tag from './Tag'
import PortableText from './PortableText'
import { Body, CardTitle } from './Primitives'
import CardTags from './CardTags'
import Card from './Card'
import CardSection from './CardSection'
import Publication from './Publication'
import CardLabel from './CardLabel'
import LinkList from './LinkList'
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
  links,
}) => {
  const categoryEntries = (categories || []).map((c) => ({
    key: c._key,
    label: c.title,
  }))
  const linkEntries = (links || []).map((l) => ({
    key: l._key,
    label: l.title || (l._type === 'doiLink' ? 'DOI Eintrag' : l.url),
    href: l.url,
  }))
  const coAuthorEntries = (coAuthors || []).map((a) => ({
    key: a._key,
    label: [a.name, a.surname].filter(Boolean).join(' '),
    href: a?.website?.url,
  }))
  return (
    <Card data-cardtype={_type} onClick={onClick}>
      <CardLabel>{getEntryTypeLabel(_type)}</CardLabel>
      <CardTitle as="h1">{title}</CardTitle>
      {categoryEntries.length > 0 && (
        <CardTags>
          {categoryEntries.map((category) => (
            <Tag key={category.key}>{category.label}</Tag>
          ))}
        </CardTags>
      )}
      {coAuthorEntries.length > 0 && (
        <CardSection title={'Mit'}>
          <LinkList entries={coAuthorEntries} />
        </CardSection>
      )}
      {context && (
        <CardSection title={'Kontext'}>
          <Body>{context}</Body>
        </CardSection>
      )}
      {publications && (
        <CardSection title={'Veröffentlicht in'}>
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
      {linkEntries.length > 0 && (
        <CardSection>
          <LinkList entries={linkEntries} />
        </CardSection>
      )}
    </Card>
  )
}

export default PortfolioEntry
