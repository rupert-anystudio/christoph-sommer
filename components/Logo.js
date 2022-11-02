import Link from 'next/link'
import styled from 'styled-components'

const ChristophSommer = styled.a`
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
