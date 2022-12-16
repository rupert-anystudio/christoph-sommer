import React from 'react'
import { getEntryTypeLabel, returnPublicationProps } from '../lib/entryHelpers'
import Tag from './Tag'
import PortableText from './PortableText'
import { Body, CardTitle } from './Primitives'
import CardTags from './CardTags'
import Card from './Card'
import CardSection from './CardSection'
// import Publication from './Publication'
import CardLabel from './CardLabel'
import LinkList from './LinkList'
import PublicationList from './PublicationList'
// import CardToggle from './CardToggle'

const PortfolioEntry = ({
  _type,
  title,
  categories,
  excerpt,
  context,
  publications,
  coAuthors,
  links,
  isDisabled,
}) => {
  const categoryEntries = (categories || []).map((category) => ({
    key: category._key,
    label: category.title,
  }))
  const linkEntries = (links || []).map((link) => ({
    key: link._key,
    label: link.title || (link._type === 'doiLink' ? 'DOI Eintrag' : link.url),
    href: link.url,
  }))
  const coAuthorEntries = (coAuthors || []).map((author) => ({
    key: author._key,
    label: [author.name, author.surname].filter(Boolean).join(' '),
    href: author?.website?.url,
  }))
  const publicationEntries = (publications || []).map((publication) => ({
    ...returnPublicationProps(publication),
    type: publication._type,
    key: publication._key,
  }))
  return (
    <Card data-cardtype={_type} isDisabled={isDisabled}>
      <CardLabel>{getEntryTypeLabel(_type)}</CardLabel>
      <CardTitle as="h1">{title}</CardTitle>
      {categoryEntries.length > 0 && (
        <CardTags>
          {categoryEntries.map((category) => (
            <Tag key={category.key}>{category.label}</Tag>
          ))}
        </CardTags>
      )}
      {publicationEntries.length > 0 && (
        <CardSection title={'Veröffentlicht in'}>
          <PublicationList
            entries={publicationEntries}
            isDisabled={isDisabled}
          />
        </CardSection>
      )}
      {coAuthorEntries.length > 0 && (
        <CardSection title={'Mit'}>
          <LinkList entries={coAuthorEntries} isDisabled={isDisabled} />
        </CardSection>
      )}
      {context && (
        <CardSection title={'Kontext'}>
          <Body>{context}</Body>
        </CardSection>
      )}
      {excerpt && (
        <CardSection>
          <PortableText value={excerpt} isDisabled={isDisabled} />
        </CardSection>
      )}
      {linkEntries.length > 0 && (
        <CardSection>
          <LinkList entries={linkEntries} isDisabled={isDisabled} />
        </CardSection>
      )}
    </Card>
  )
}

export default PortfolioEntry
