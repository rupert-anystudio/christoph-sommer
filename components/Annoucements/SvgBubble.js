import { useCallback, useState } from 'react'
import useObservedElement from '../useObservedElement'
import { returnCappedLength, returnSegmentsFromLength } from './bubbleHelpers'
import { Svg } from './Svg'
import { SEGMENT_MINLENGTH } from './bubbleHelpers'

export const SvgBubble = ({ bubbleProps, arrowPathProps }) => {
  const [layout, setLayout] = useState(null)
  const onBaseRectResize = useCallback((dimensions, baseRect) => {
    const totalLength = baseRect.getTotalLength()
    const segments = returnSegmentsFromLength(totalLength, SEGMENT_MINLENGTH)
    const centerPoints = segments.map((segmentLength, index) => {
      const baseLength = segmentLength * (index + 1)
      const pointLength = baseLength
      const pointLengthCapped = returnCappedLength(pointLength, totalLength)
      return baseRect.getPointAtLength(pointLengthCapped)
    })
    const newLayout = {
      totalLength,
      segments,
      centerPoints,
    }
    setLayout(newLayout)
  }, [])

  const [baseRectRef] = useObservedElement(onBaseRectResize)

  return (
    <Svg {...bubbleProps.svg} id="bubble-svg">
      {['outside', 'inside'].map((className) => (
        <g className={className} key={className}>
          <path {...arrowPathProps} />

          {layout && <></>}
        </g>
      ))}
      <rect
        {...bubbleProps.baseRect}
        ref={baseRectRef}
        id="bubble-base-rect"
        className="inside"
      />
    </Svg>
  )
}
