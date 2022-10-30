import CardGrid from './CardGrid'
import Tag from './Tag'
import PortableText from './PortableText'
import { getEntryTypeColor, getEntryTypeLabel } from '../lib/entryHelpers'
import { Body, CardTitle, Small } from './Primitives'
import CardTags from './CardTags'
import Card from './Card'
import CardToggle from './CardToggle'
import CardSection from './CardSection'
import React from 'react'
import Publication from './Publication'

const getEntryTags = (categories = []) =>
  (categories || []).map((c) => ({
    key: c._key,
    label: c.title,
  }))

const getKey = (entry) => entry?._id ?? null

const returnEntryPath = (entry) => {
  const { _id, _type } = entry
  if (_type === 'publishedText') return `/text/${_id}`
  // if (_type === 'statement') return `/statemnt/${_id}`
  // if (_type === 'speech') return `/vortrag/${_id}`
  // if (_type === 'project') return `/projekt/${_id}`
  return null
}

const returnPublicationProps = (p) => {
  const { issue, title, magazine, newspaper, date, subtitle } = p
  if (p._type === 'magazineIssue') {
    return {
      value: [magazine.title, title].filter(Boolean).join(' - '),
      date: issue,
      url: magazine?.website?.url,
    }
  }
  if (p._type === 'publicationNewspaper') {
    return {
      value: newspaper.title,
      date: date,
      url: newspaper?.website?.url,
    }
  }
  if (p._type === 'book') {
    return {
      value: [title, subtitle].filter(Boolean).join(' - '),
      date: date,
    }
  }
  return null
}

const CardGridPortfolio = ({ portfolio = [] }) => {
  const renderContent = (entry) => {
    const {
      _type,
      title,
      categories,
      excerpt,
      context,
      publications,
      coAuthors,
    } = entry
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
        <CardToggle href={returnEntryPath(entry)} />
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
