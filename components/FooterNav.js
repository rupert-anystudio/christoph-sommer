import styled from 'styled-components'
import AnyLink from './AnyLink'
import usePagePropsContext from '../hooks/usePagePropsContext'
import { Small } from './Primitives'

const NavLink = styled(Small).attrs({ as: 'a' })`
  text-decoration: none;
  color: var(--color-txt);
  margin-right: var(--padding-page);
`

const FooterNav = () => {
  const { footerNav } = usePagePropsContext()
  return (
    <>
      {footerNav.map(({ key, label, href }) => (
        <AnyLink href={href} key={key} Elem={NavLink}>
          {label}
        </AnyLink>
      ))}
    </>
  )
}

export default FooterNav
