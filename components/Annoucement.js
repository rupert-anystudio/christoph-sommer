import styled from 'styled-components'
import { PortableText } from '@portabletext/react'
import { Title } from './Primitives'
import AnnoucementBubble from './AnnoucementBubble'
import useObservedElement from './useObservedElement'

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  /* outline: 2px solid red; */
`

const Content = styled.div`
  position: relative;
  padding: var(--padding-page);
  text-align: center;
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

const Annoucement = ({ title, content }) => {
  const [observedRef, dimensions] = useObservedElement()
  return (
    <>
      {dimensions && (
        <AnnoucementBubble
          width={dimensions.width}
          height={dimensions.height}
          padding={70}
        />
      )}
      <Wrap ref={observedRef}>
        <Content>
          <Title as="h1">{title}</Title>
          <PortableText value={content} />
        </Content>
      </Wrap>
    </>
  )
}

export default Annoucement
