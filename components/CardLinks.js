import styled from 'styled-components'
import AnyLink from './AnyLink'

export const CardLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: var(--fs-root);
  line-height: var(--lh-root);
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
  li {
    &:not(:last-child) {
      margin-bottom: 0.8rem;
    }
  }
`

const Link = styled.span`
  /* color: red; */
  color: var(--color-txt);
  text-decoration: none;
  border-bottom: 2px solid currentColor;
  display: inline-block;
  &:before {
    content: '↗';
    padding-right: 0.4rem;
    font-size: 1.15em;
    line-height: 0.9em;
    /* text-decoration: none; */
    /* display: inline-block; */
  }
`

export const CardLink = ({ href, children }) => {
  return (
    <li>
      <AnyLink href={href} Elem={Link}>
        {children}
      </AnyLink>
    </li>
  )
}
