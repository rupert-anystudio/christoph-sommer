import styled from 'styled-components'
import { Title } from '../Primitives'
import PortableText from '../PortableText'

const Wrap = styled.div`
  position: relative;
  padding: var(--padding-page);
  text-align: center;
  color: var(--color-txt);
  background: var(--color-bg);
  > * {
    margin: 0.5em 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const AnnoucementContent = ({ title, content, style, className }) => {
  return (
    <Wrap style={style} className={className}>
      <Title as="h1">{title}</Title>
      <PortableText value={content} />
    </Wrap>
  )
}

export default AnnoucementContent
