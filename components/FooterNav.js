import styled from 'styled-components'
import AnyLink from './AnyLink'
import { usePagePropsContext } from './PagePropsContext'
import { Small } from './Primitives'

const NavLink = styled(Small).attrs({ as: 'a' })`
  text-decoration: none;
  color: var(--color-txt);
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
