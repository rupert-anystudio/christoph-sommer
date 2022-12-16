import React from 'react'
import styled from 'styled-components'
import ExternalLink from './ExternalLink'
import { Body, Link, Small } from './Primitives'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Publication = styled.li`
  display: block;
  padding: 0 2em 0 0;
  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`

const Title = styled(Body)`
  &:not(:first-child) {
    margin-top: 0.5em;
  }
`

const SubEntries = styled(Small).attrs({ as: 'ul' })`
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
`

const SubEntry = styled.li`
  > * {
    &:not(:last-child) {
      margin-right: 0.6rem;
    }
  }
`

const PublicationList = ({ entries = [], isDisabled }) => {
  if (!entries) return null
  if (entries.length < 1) return null
  // console.log({ entries })
  return (
    <List>
      {entries.map((entry, index0) => {
        const { key, label, href, subentries = [] } = entry
        if (!key) return null
        return (
          <Publication key={key}>
            <Title>
              <ExternalLink href={href} isDisabled={isDisabled}>
                {label}
              </ExternalLink>
            </Title>
            {subentries.length > 0 && (
              <SubEntries>
                {subentries.map((parts = [], partsIndex) => {
                  return (
                    <SubEntry key={partsIndex}>
                      {(parts || []).map((part, partIndx) => {
                        return (
                          <ExternalLink
                            href={part.href}
                            key={partIndx}
                            activeIcon={'↗'}
                            isDisabled={isDisabled}
                          >
                            {part.label}
                          </ExternalLink>
                        )
                      })}
                    </SubEntry>
                  )
                })}
              </SubEntries>
            )}
          </Publication>
        )
      })}
    </List>
  )
}

export default PublicationList
