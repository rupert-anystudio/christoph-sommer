import React from 'react'
import {
  getEntryTypeLabel,
  returnPublicationProps,
} from '../../lib/entryHelpers'
import PortableText from '../PortableText'
import { Body, Title } from '../Primitives'
import Card, { CardLabel, CardSection, CardTag, CardTags } from '../Card'
import LinkList from '../LinkList'
import PublicationList from '../PublicationList'
import { formatProjectTimeframe } from '../../lib/dateHelpers'

const returnLabel = (type, timeframe) => {
  const label = getEntryTypeLabel(type)
  if (type !== 'project') return label
  const projectTimeframe = formatProjectTimeframe(timeframe)
  return [label, projectTimeframe].filter(Boolean).join(' ')
}

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
  timeframe,
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
      <CardLabel>{returnLabel(_type, timeframe)}</CardLabel>
      <Title as="h1">{title}</Title>
      {categoryEntries.length > 0 && (
        <CardTags>
          {categoryEntries.map((category) => (
            <CardTag key={category.key}>{category.label}</CardTag>
          ))}
        </CardTags>
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
      {linkEntries.length > 0 && (
        <CardSection>
          <LinkList entries={linkEntries} isDisabled={isDisabled} />
        </CardSection>
      )}
    </Card>
  )
}

export default PortfolioEntry
