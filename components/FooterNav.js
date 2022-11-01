import styled from 'styled-components'
import AnyLink from './AnyLink'
import { Small } from './Primitives'

const NavLink = styled(Small).attrs({ as: 'a' })`
  text-decoration: none;
  color: var(--color-txt);
`

const FooterNav = ({ nav = [] }) => {
  return (
    <>
      {nav.map(({ key, label, href }) => (
        <AnyLink href={href} key={key} Elem={NavLink}>
          {label}
        </AnyLink>
      ))}
    </>
  )
}

export default FooterNav
