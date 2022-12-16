import styled from 'styled-components'
import ExternalLink from './ExternalLink'
import { Link } from './Primitives'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Entry = styled(Link).attrs({ as: 'li' })`
  &:not(:last-child) {
    margin-bottom: 0.6rem;
  }
`

const LinkList = ({ entries = [], isDisabled }) => {
  if (!entries) return null
  if (entries.length < 1) return null
  return (
    <List>
      {entries.map((entry) => {
        const { key, label, href } = entry
        return (
          <Entry key={key}>
            <ExternalLink
              href={href}
              // staticIcon={'·'}
              activeIcon={'↗'}
              isDisabled={isDisabled}
            >
              {label}
            </ExternalLink>
          </Entry>
        )
      })}
    </List>
  )
}

export default LinkList
