import React from 'react'
import PortableText from './PortableText'
import { Body } from './Primitives'
import Card, { CardSection, CardTag, CardTags, CardTitle } from './Card'
import LinkList from './LinkList'
import PublicationList from './PublicationList'

const PortfolioEntry = ({
  type,
  typeLabel,
  title,
  slug,
  categories,
  excerpt,
  context,
  publications,
  coAuthors,
  links,
}) => {
  return (
    <Card entryType={type} id={slug}>
      <CardSection title={typeLabel}>
        <CardTitle href={`#${slug}`}>{title}</CardTitle>
        {categories.length > 0 && (
          <CardTags>
            {categories.map((category) => (
              <CardTag key={category.key}>{category.label}</CardTag>
            ))}
          </CardTags>
        )}
      </CardSection>
      {context && (
        <CardSection title={'Kontext'}>
          <Body>{context}</Body>
        </CardSection>
      )}
      {excerpt && (
        <CardSection>
          <PortableText value={excerpt} />
        </CardSection>
      )}
      {publications.length > 0 && (
        <CardSection title={'Veröffentlicht in'}>
          <PublicationList entries={publications} />
        </CardSection>
      )}
      {coAuthors.length > 0 && (
        <CardSection title={'Mit'}>
          <LinkList entries={coAuthors} />
        </CardSection>
      )}
      {links.length > 0 && (
        <CardSection>
          <LinkList entries={links} />
        </CardSection>
      )}
    </Card>
  )
}

export default PortfolioEntry
