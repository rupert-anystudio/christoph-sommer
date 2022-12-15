import styled from 'styled-components'
import AnyLink from './AnyLink'
import { Link } from './Primitives'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    &:not(:last-child) {
      margin-bottom: 0.6rem;
    }
  }
`

const Elem = styled(Link)`
  position: relative;
  color: var(--color-txt);
  text-decoration: none;
  display: inline-block;
  &:before {
    content: '↗';
    padding-right: 0.4rem;
    font-size: 1.15em;
    line-height: 0.9em;
    visibility: hidden;
  }
  &:not(:last-child) {
    margin-bottom: 0.6rem;
  }
`

const LinkElem = styled(Elem)`
  &:before {
    visibility: visible;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 1px dashed currentColor;
  }
  @media (hover: hover) {
    cursor: pointer;
    &:hover {
      &:after {
        border-bottom: 2px solid currentColor;
      }
    }
  }
`

const LinkList = ({ entries = [] }) => {
  if (!entries) return null
  if (entries.length < 1) return null
  return (
    <List>
      {entries.map((entry) => {
        const { key, label, href } = entry
        if (href) {
          return (
            <li key={key}>
              <AnyLink href={href} Elem={LinkElem}>
                {label}
              </AnyLink>
            </li>
          )
        }
        return (
          <li key={key}>
            <Elem>{label}</Elem>
          </li>
        )
      })}
    </List>
  )
}

export default LinkList
