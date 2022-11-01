import Link from 'next/link'
import styled from 'styled-components'

const Logo = styled.a`
  font-size: 6rem;
  line-height: 0.8334;
  font-family: var(--ff-suisse);
  font-weight: var(--fw-suisse);
  font-style: var(--fx-suisse);
  text-decoration: none;
  color: var(--color-txt);
  white-space: pre;
  text-align: center;
  span {
    display: block;
    &:last-child {
      text-indent: 0.2em;
    }
  }
`

const HeaderLogo = () => {
  return (
    <Link passHref href="/">
      <Logo>
        <span>Christoph</span>
        <span>Sommer</span>
      </Logo>
    </Link>
  )
}

export default HeaderLogo
