import styled from 'styled-components'
import Bubble from './Bubble'
import useObservedElementDimensions from './ObservedElementDimensions/useObservedElementDimensions'

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const AnnoucementBubble = ({ id }) => {
  const { dimensions } = useObservedElementDimensions()
  const width = dimensions?.annoucements?.[id]?.width
  const height = dimensions?.annoucements?.[id]?.height
  if (!width || !height) return null
  return (
    <Wrap>
      <Bubble
        width={width}
        height={height}
        minSegmentsLength={80}
        maxVariation={40}
        showHelpers={false}
        randomShift={15}
        offset={0}
        padding={70}
        seed={0}
        fontSize={7}
      />
    </Wrap>
  )
}

export default AnnoucementBubble
