import styled from 'styled-components'
import PortableText from './PortableText'
import { Title } from './Primitives'

const Wrap = styled.div`
  padding: calc(var(--padding-page) * 2) var(--padding-page);
  padding-bottom: 12rem;
`

const PageTitle = styled(Title).attrs({ as: 'h1' })`
  margin-bottom: 2rem;
`

const StaticPage = ({ title, content }) => {
  return (
    <Wrap>
      {title && <PageTitle>{title}</PageTitle>}
      <PortableText value={content} />
    </Wrap>
  )
}

export default StaticPage
