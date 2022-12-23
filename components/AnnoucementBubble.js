import styled from 'styled-components'
import Bubble from './Bubble'

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const AnnoucementBubble = () => {
  return (
    <Wrap>
      <Bubble />
    </Wrap>
  )
}

export default AnnoucementBubble
