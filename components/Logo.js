import Link from 'next/link'
import styled from 'styled-components'

export const LogoWrap = styled.div`
  position: relative;
  margin: 0 auto;
`

const ChristophSommer = styled.a`
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
      text-indent: -0.45em;
    }
  }
`

const Logo = () => {
  return (
    <Link passHref href="/">
      <ChristophSommer>
        <span>Über</span>
        <span>Tourismus</span>
      </ChristophSommer>
    </Link>
  )
}

export default Logo
