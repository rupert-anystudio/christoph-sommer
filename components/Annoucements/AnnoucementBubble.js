import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import useObservedElement from '../useObservedElement'

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  position: absolute;
  pointer-events: none;
  /* outline: 1px solid grey; */
`

const Helpers = styled.g`
  fill: none;
  stroke: red;
  stroke-width: 1;
`

const BaseShape = styled.rect`
  fill: none;
  stroke: none;
`

const PathBackground = styled.path`
  fill: var(--color-bg);
  stroke: var(--color-txt);
  stroke-width: 4;
  stroke-linejoin: miter;
  stroke-miterlimit: 45;
`
const PathForeGround = styled.path`
  fill: var(--color-bg);
  stroke: none;
  stroke-width: 0;
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

export const returnSegmentsFromLength = (totalLength, minLength = 80) => {
  if (!totalLength) return []
  const segmentAmount = Math.ceil(totalLength / minLength)
  const segmentLength = totalLength / segmentAmount
  return Array.from({ length: segmentAmount }, (v, i) => segmentLength)
}

export const returnCappedLength = (length, totalLength) => {
  if (length > totalLength) return length % totalLength
  if (length < 0) return totalLength + (length % totalLength)
  return length
}

export const returnPointBetweenPoints = (start, end) => {
  const x = (start.x + end.x) / 2
  const y = (start.y + end.y) / 2
  return { x, y }
}

export const returnAngleFromVector = ({ x, y }) => {
  var angle = Math.atan2(y, x)
  var degrees = (180 * angle) / Math.PI
  return (360 + Math.round(degrees)) % 360
}

export const returnVectorFromPoints = (start, end) => ({
  x: end.x - start.x,
  y: end.y - start.y,
})

export const returnDistanceBetweenPoints = (start, end) =>
  Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

export const returnVectorLength = (vector) =>
  Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))

export const returnNormalizedVector = (vector) => {
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

const returnArrowPath = ({ x, y, width, height }) => {
  const bezierH = 20
  const bezierV = 10
  const halfWidth = width / 2
  // prettier-ignore
  return `M ${x - halfWidth},${y} C ${x - halfWidth + bezierV},${y - 5} ${x - 2},${y - height + bezierH} ${x},${y - height} C ${x + 2},${y - height + bezierH} ${x + halfWidth - bezierV},${y - 5} ${x + halfWidth},${y} Z`
}

const AnnoucementBubble = ({
  width,
  height,
  padding = 120,
  borderRadius = 70,
  segmentMinLength = 90,
  deviationSide = 5,
  deviationPerpendicular = 10,
}) => {
  const sideDeviation = useStoredDeviationGetter(deviationSide)
  const perpendicularDeviation = useStoredDeviationGetter(
    deviationPerpendicular
  )

  const returnLayoutFromElement = (element, dimensions) => {
    // const triggerEl = triggerRef.current
    // const triggerRect = triggerEl.getBoundingClientRect()
    // const elemRect = element.getBoundingClientRect()
    // const triggerDiff = {
    //   x: Math.abs(triggerRect.left - elemRect.x),
    //   y: Math.abs(triggerRect.bottom - elemRect.y),
    // }
    // const arrowPath = returnArrowPath({
    //   y: padding,
    //   x: padding + triggerDiff.x + triggerRect.width / 2,
    //   height: triggerDiff.y - 20,
    //   width: 80,
    // })

    const totalLength = element.getTotalLength()
    const centerPoint = { x: width / 2 + padding, y: height / 2 + padding }
    const segments = returnSegmentsFromLength(totalLength, segmentMinLength)
    const pointsOnBaseShape = segments.map((segmentLength, index) => {
      const baseLength = segmentLength * (index + 1)
      const deviation = sideDeviation(index) // * 0 // DISABLED
      const pointLength = baseLength + deviation
      // const pointLength = baseLength
      const pointLengthCapped = returnCappedLength(pointLength, totalLength)
      return element.getPointAtLength(pointLengthCapped)
    })
    const transformedPoints = pointsOnBaseShape.map((point, index) => {
      const deviation = perpendicularDeviation(index) * 0 // DISABLED
      const normalFromCenter = returnNormalizedVector({
        x: point.x - centerPoint.x,
        y: point.y - centerPoint.y,
      })
      return {
        x: point.x + normalFromCenter.x * deviation,
        y: point.y + normalFromCenter.y * deviation,
      }
    })
    const points = transformedPoints.map((end, index) => {
      const start =
        index === 0
          ? transformedPoints[transformedPoints.length - 1]
          : transformedPoints[index - 1]
      const mid = returnPointBetweenPoints(start, end)
      const normal = returnVectorFromPoints(start, end)
      const distance = returnDistanceBetweenPoints(start, end)
      return {
        start,
        mid,
        end,
        normal,
        distance,
      }
    })
    const bubblePath = points
      .map((p, i) => {
        const rotation = returnAngleFromVector(p.normal)
        let segment = '0,1'
        // segment = i % 2 !== 0 ? '0,1' : '0,0'
        const radius = Math.ceil(p.distance / 2)
        const ra = radius * 1.1
        const rb = radius * 1.1
        const end = `${p.end.x},${p.end.y}`
        const arc = `A ${ra},${rb} ${rotation} ${segment} ${end}`
        if (i === 0) return `M ${p.start.x},${p.start.y} ${arc}`
        if (i === points.length - 1) return `${arc} Z`
        return arc
      })
      .filter(Boolean)
      .join(' ')

    return {
      bubblePath,
      // arrowPath,
    }
  }

  const [layout, setLayout] = useState()

  const onBaseShapeResize = (dimensions, element) => {
    const newLayout = returnLayoutFromElement(element, dimensions)
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
      {layout && (
        <>
          <PathBackground d={layout.bubblePath} />
          <Helpers></Helpers>
        </>
      )}
      <BaseShape {...baseShapeProps} ref={observedRef} />
    </Svg>
  )
}

export default AnnoucementBubble
