import styled from 'styled-components'
import PortableText from './PortableText'
import { CardTitle } from './Primitives'

const Wrap = styled.div`
  padding: calc(var(--padding-page) * 2) var(--padding-page);
  padding-bottom: 12rem;
`

const Title = styled(CardTitle).attrs({ as: 'h1' })`
  margin-bottom: 2rem;
`

const StaticPage = ({ title, content }) => {
  return (
    <Wrap>
      <Title>{title}</Title>
      <PortableText value={content} />
    </Wrap>
  )
}

export default StaticPage
