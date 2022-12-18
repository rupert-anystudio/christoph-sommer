import Link from 'next/link'
import styled from 'styled-components'

export const LogoWrap = styled.div`
  position: relative;
  margin: 0 auto;
`

const LogoText = styled.a`
  font-size: calc(var(--height-header) * 0.4);
  line-height: 0.8334;
  font-family: var(--ff-suisse);
  font-weight: var(--fw-suisse);
  font-style: var(--fx-suisse);
  text-decoration: none;
  color: currentColor;
  white-space: pre;
  text-align: center;
  outline: none;
  &:hover,
  &:focus,
  &:active {
    outline: none;
  }
  span {
    display: block;
    &:first-child {
      text-indent: -3.9em;
    }
  }
`

const Logo = () => {
  return (
    <Link passHref href="/">
      <LogoText>
        <span>über</span>
        <span>Tourismus</span>
      </LogoText>
    </Link>
  )
}

export default Logo
