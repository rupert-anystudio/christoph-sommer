import Link from 'next/link'
import styled from 'styled-components'
import { SmallPillButton } from './Primitives'

const HeaderLogo = () => {
  return (
    <Link passHref href="/">
      <SmallPillButton as="a">{`Christop Sommer`}</SmallPillButton>
    </Link>
  )
}

export default HeaderLogo
