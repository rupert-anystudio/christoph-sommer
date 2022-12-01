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
  span {
    display: block;
    &:last-child {
      text-indent: 0.2em;
    }
  }
  @media (min-width: 40rem) {
    /* font-size: calc(var(--height-header) * 0.4); */
  }
`

const Logo = () => {
  return (
    <Link passHref href="/">
      <ChristophSommer>
        <span>Christoph</span>
        <span>Sommer</span>
      </ChristophSommer>
    </Link>
  )
}

export default Logo
