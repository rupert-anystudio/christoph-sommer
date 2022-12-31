import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import useObservedElement from './useObservedElement'

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  position: absolute;
  /* outline: 1px solid grey; */
`

const Helpers = styled.g`
  fill: none;
  stroke: red;
  stroke-width: 1;
  display: none;
`

const BaseShape = styled.rect`
  fill: var(--color-bg);
  stroke: none;
`

const BubblePath = styled.path`
  fill: var(--color-bg);
  stroke: var(--color-txt);
  stroke-width: 6;
`

const returnSvgProps = ({ width, height, padding }) => ({
  width: width + padding * 2,
  height: height + padding * 2,
  viewBox: `0 0 ${width + padding * 2} ${height + padding * 2}`,
  style: {
    top: padding * -1,
    left: padding * -1,
  },
})

const returnBaseShapeProps = ({ width, height, padding, borderRadius }) => ({
  width,
  height,
  x: padding,
  y: padding,
  rx: borderRadius,
  ry: borderRadius,
})

const returnSegmentsFromLength = (totalLength) => {
  if (!totalLength) return []
  const segmentMinLength = 60
  const segmentAmount = Math.ceil(totalLength / segmentMinLength)
  const segmentLength = totalLength / segmentAmount
  return Array.from({ length: segmentAmount }, (v, i) => segmentLength)
}

const returnCappedLength = (length, totalLength) => {
  if (length > totalLength) return length % totalLength
  if (length < 0) return totalLength + (length % totalLength)
  return length
}

const returnPointBetweenPoints = (start, end) => {
  const x = (start.x + end.x) / 2
  const y = (start.y + end.y) / 2
  return { x, y }
}

const returnAngleFromVector = ({ x, y }) => {
  var angle = Math.atan2(y, x)
  var degrees = (180 * angle) / Math.PI
  return (360 + Math.round(degrees)) % 360
}

const returnVectorFromPoints = (start, end) => ({
  x: end.x - start.x,
  y: end.y - start.y,
})

const returnDistanceBetweenPoints = (start, end) =>
  Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

const returnVectorLength = (vector) =>
  Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))

const returnNormalizedVector = (vector) => {
  const length = returnVectorLength(vector)
  return {
    x: vector.x / length,
    y: vector.y / length,
  }
}

const useStoredDeviationGetter = (amount) => {
  const deviationStore = useRef({})
  const returnDeviation = useCallback(
    (index) => {
      let deviation = deviationStore.current[index]
      if (!deviation) {
        deviation = Math.random() * amount
        deviationStore.current[index] = deviation
      }
      return deviation
    },
    [amount]
  )
  return returnDeviation
}

const AnnoucementBubble = ({ width, height, padding, borderRadius = 80 }) => {
  const sideDeviation = useStoredDeviationGetter(30)
  const perpendicularDeviation = useStoredDeviationGetter(8)

  const returnLayoutFromElement = (element) => {
    if (!element) return null
    const totalLength = element.getTotalLength()
    const centerPoint = { x: width / 2 + padding, y: height / 2 + padding }
    const segments = returnSegmentsFromLength(totalLength)
    const segmentPoints = segments.map((segmentLength, index) => {
      const baseLength = segmentLength * (index + 1)
      const deviation = sideDeviation(index)
      const pointLength = baseLength + deviation
      // const pointLength = baseLength
      const pointLengthCapped = returnCappedLength(pointLength, totalLength)
      return element.getPointAtLength(pointLengthCapped)
    })
    const endPoints = segmentPoints.map((point, index) => {
      const deviation = perpendicularDeviation(index)
      const normalFromCenter = returnNormalizedVector({
        x: point.x - centerPoint.x,
        y: point.y - centerPoint.y,
      })
      return {
        x: point.x + normalFromCenter.x * deviation,
        y: point.y + normalFromCenter.y * deviation,
      }
    })
    const points = endPoints.map((end, index) => {
      const start =
        index === 0 ? endPoints[endPoints.length - 1] : endPoints[index - 1]
      const mid = returnPointBetweenPoints(start, end)
      const normal = returnVectorFromPoints(centerPoint, mid)
      const distance = returnDistanceBetweenPoints(start, end)
      return {
        start,
        mid,
        end,
        normal,
        distance,
      }
    })
    const d = points
      .map((p, i) => {
        const rotation = returnAngleFromVector(p.normal)
        let segment = '0,1'
        // segment = i % 2 !== 0 ? '0,1' : '0,0'
        const dampening = 1.1
        const radius = (p.distance / 2) * dampening
        const ra = radius * 1
        const rb = radius * 1
        const end = `${p.end.x},${p.end.y}`
        const arc = `A ${ra},${rb} ${rotation} ${segment} ${end}`
        if (i === 0) return `M ${p.start.x},${p.start.y} ${arc}`
        if (i === points.length - 1) return `${arc} Z`
        return arc
      })
      .filter(Boolean)
      .join(' ')
    return { totalLength, centerPoint, segmentPoints, endPoints, points, d }
  }

  const [layout, setLayout] = useState()

  const onBaseShapeResize = (dimensions, element) => {
    const newLayout = returnLayoutFromElement(element.target)
    setLayout(newLayout)
  }

  const [observedRef] = useObservedElement(onBaseShapeResize)

  const svgProps = returnSvgProps({
    width,
    height,
    padding,
  })

  const baseShapeProps = returnBaseShapeProps({
    width,
    height,
    padding,
    borderRadius,
  })

  return (
    <Svg {...svgProps}>
      <BaseShape {...baseShapeProps} ref={observedRef} />
      {layout && (
        <>
          <BubblePath d={layout.d} />
          <Helpers>
            <rect {...baseShapeProps} />
            {layout.segmentPoints.map((p, index) => (
              <circle key={index} cx={p.x} cy={p.y} r={10} />
            ))}
            {layout.endPoints.map((p, index) => (
              <circle key={index} cx={p.x} cy={p.y} r={10} />
            ))}
            <circle
              cx={layout.centerPoint.x}
              cy={layout.centerPoint.y}
              r={10}
            />
          </Helpers>
        </>
      )}
    </Svg>
  )
}

export default AnnoucementBubble
