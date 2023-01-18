import { to, useIsomorphicLayoutEffect } from '@react-spring/web'
import { useCallback, useState } from 'react'
import { animated } from '@react-spring/web'
import styled from 'styled-components'
import useObservedElement from '../useObservedElement'

export const getFromWrappingArray = (array, index) => {
  if (index > array.length - 1) return array[index - array.length]
  if (index < 0) return array[array.length + index]
  return array[index]
}

export const returnSegmentsFromLength = ({
  totalLength,
  fixedAmount = undefined,
  minLength = 80,
}) => {
  if (!totalLength) return []
  const segmentAmount = fixedAmount || Math.ceil(totalLength / minLength)
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

export const returnVectorFromPoints = (start, end) => ({
  x: end.x - start.x,
  y: end.y - start.y,
})

export const returnDistanceBetweenPoints = (start, end) =>
  Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

export const returnAngleFromVector = ({ x, y }) => {
  var angle = Math.atan2(y, x)
  var degrees = (180 * angle) / Math.PI
  return (360 + Math.round(degrees)) % 360
}

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  user-select: none;
  pointer-events: none;
  outline: none;
  /* outline: 1px solid red; */
  path {
    fill: var(--color-bg);
    stroke: none;
    pointer-events: auto;
  }
  .baseShape {
    fill: none;
    stroke: none;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
  }
`

const useBubblePoints = (config = {}) => {
  const { pointAmount = 19, pointDeviation = 30 } = config
  const [bubblePoints, setBubblePoints] = useState([])
  const [bubblePointGroups, setBubblePointGroups] = useState([])
  const onBaseElemResize = useCallback((dimensions, element) => {
    const totalLength = element.getTotalLength()
    const segments = returnSegmentsFromLength({
      totalLength,
      fixedAmount: pointAmount,
    })
    const newBubblePoints = segments.map((segmentLength, index) => {
      const baseLength = segmentLength * (index + 1)
      const deviation = Math.random() * pointDeviation - pointDeviation * 2
      // const deviation = 0
      const pointLength = baseLength + deviation
      const pointLengthCapped = returnCappedLength(pointLength, totalLength)
      return element.getPointAtLength(pointLengthCapped)
    })
    setBubblePoints(newBubblePoints)

    const newBubblePointGroups = newBubblePoints.map((end, index) => {
      const start =
        index === 0
          ? newBubblePoints[newBubblePoints.length - 1]
          : newBubblePoints[index - 1]
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

    setBubblePointGroups(newBubblePointGroups)
  }, [])
  const [baseElemRef] = useObservedElement(onBaseElemResize)
  return {
    baseElemRef,
    bubblePoints,
    bubblePointGroups,
  }
}

const useBubblePath = ({ bubblePointGroups }) => {
  const [bubblePath, setBubblePath] = useState(null)

  useIsomorphicLayoutEffect(() => {
    if (!bubblePointGroups || !bubblePointGroups.length) return
    const newBubblePath = bubblePointGroups
      .map((p, i) => {
        const rotation = returnAngleFromVector(p.normal)
        let segment = '0,1'
        // segment = i % 2 !== 0 ? '0,1' : '0,0'
        const radius = Math.ceil(p.distance / 2)
        const ra = radius * 1.08
        const rb = radius * 1.08
        const end = `${p.end.x},${p.end.y}`
        const arc = `A ${ra},${rb} ${rotation} ${segment} ${end}`
        if (i === 0) return `M ${p.start.x},${p.start.y} ${arc}`
        if (i === bubblePointGroups.length - 1) return `${arc} Z`
        return arc
      })
      .filter(Boolean)
      .join(' ')
    setBubblePath(newBubblePath)
  }, [bubblePointGroups])
  return bubblePath
}

const sides = {
  top: {
    getArrowPoint: ({ x, y, arrowSize, height, arrowX }) => ({
      x: x + arrowX + arrowSize.width / 2,
      y: y + height + arrowSize.length,
    }),
  },
  right: {
    getArrowPoint: ({ x, y, arrowSize, arrowY }) => ({
      x: x - arrowSize.length,
      y: y + arrowY + arrowSize.width / 2,
    }),
  },
  bottom: {
    getArrowPoint: ({ x, y, arrowSize, arrowX }) => ({
      x: x + arrowX + arrowSize.width / 2,
      y: y - arrowSize.length,
    }),
  },
  left: {
    getArrowPoint: ({ x, y, arrowSize, width, arrowY }) => ({
      x: x + width + arrowSize.length,
      y: y + arrowY + arrowSize.width / 2,
    }),
  },
}

const useArrowTip = ({ baseRectProps = {}, arrowState = {} }) => {
  const { arrowX, arrowY, currentSide, arrowSize } = arrowState
  if (typeof arrowX !== 'number' && typeof arrowY !== 'number') return null
  const { x, y, width, height } = baseRectProps
  const side = sides[currentSide]
  if (!side) return null
  return side.getArrowPoint({
    x,
    y,
    width,
    height,
    arrowX,
    arrowY,
    arrowSize,
  })
}

const useMeasuredPoints = (points, target) => {
  if (!target || !points || !points.length) return []
  const pointsMeasured = points
    .map((point, index) => ({
      ...point,
      index,
      distance:
        Math.round(returnDistanceBetweenPoints(point, target) * 10) / 10,
    }))
    .sort((a, b) => a.distance - b.distance)
  const dMax = pointsMeasured[pointsMeasured.length - 1]?.distance
  const dMin = pointsMeasured[0]?.distance
  const distanceRange = dMax - dMin
  const measuredPoints = pointsMeasured
    .map((point, distanceIndex) => ({
      ...point,
      distanceIndex,
      distanceRelative: (point.distance - dMin) / distanceRange,
    }))
    .sort((a, b) => a.index - b.index)
  return measuredPoints
}

const useArrowPoints = ({ measuredPoints, arrowTip }) => {
  if (!arrowTip || !measuredPoints || !measuredPoints.length) return null
  const closestPoint = measuredPoints.find((p) => p.distanceIndex === 0)
  const closestPointIndex = measuredPoints.indexOf(closestPoint)

  const arrowPoints = {
    tip: {
      point: arrowTip,
      bezier: arrowTip,
    },
    a: {
      point: getFromWrappingArray(measuredPoints, closestPointIndex - 3),
      bezier: closestPoint,
    },
    b: {
      point: getFromWrappingArray(measuredPoints, closestPointIndex + 3),
      bezier: closestPoint,
    },
  }

  return arrowPoints
}

export const SvgBubble = ({
  svgProps,
  baseRectProps,
  shapeRectProps,
  arrowState,
  pullStyle,
}) => {
  const arrowTip = useArrowTip({ baseRectProps, arrowState })
  const { baseElemRef, bubblePointGroups } = useBubblePoints()
  const allPoints = bubblePointGroups.reduce((acc, p) => {
    acc.push({ x: p.start.x, y: p.start.y })
    acc.push({ x: p.mid.x, y: p.mid.y })
    return acc
  }, [])
  const measuredPoints = useMeasuredPoints(allPoints, arrowTip)
  const arrowPoints = useArrowPoints({
    measuredPoints,
    arrowTip,
  })
  // const arrowPath = useArrowPath(arrowPoints)
  const bubblePath = useBubblePath({ bubblePointGroups })

  return (
    <Svg {...svgProps}>
      <rect className="baseShape" {...shapeRectProps} ref={baseElemRef} />
      {/* <rect {...baseRectProps} /> */}
      {bubblePath && <path d={bubblePath} />}
      {arrowPoints && (
        <animated.path
          d={to(
            [pullStyle.x, pullStyle.y],
            (x, y) =>
              // prettier-ignore
              `M ${arrowPoints.a.point.x},${arrowPoints.a.point.y}
              C ${arrowPoints.a.bezier.x},${arrowPoints.a.bezier.y} ${arrowPoints.tip.bezier.x - x},${arrowPoints.tip.bezier.y - y} ${arrowPoints.tip.point.x - x},${arrowPoints.tip.point.y - y}
              C ${arrowPoints.tip.bezier.x - x},${arrowPoints.tip.bezier.y - y} ${arrowPoints.b.bezier.x},${arrowPoints.b.bezier.y} ${arrowPoints.b.point.x},${arrowPoints.b.point.y}
              Z`
          )}
        />
      )}
      {/* <rect {...baseRectProps} stroke="yellow" fill="none" />
      <rect {...shapeRectProps} stroke="yellow" fill="none" /> */}
      {/* <g>
        <rect {...baseRectProps} stroke="yellow" fill="none" />
        {arrowPath && <path d={arrowPath} stroke="yellow" fill="none" />}
        {arrowTip && (
          <circle
            cx={arrowTip.x}
            cy={arrowTip.y}
            r={8}
            stroke="none"
            fill="red"
          />
        )}
        {measuredPoints && (
          <g>
            {measuredPoints.map((p, index) => (
              <g key={index}>
                <g transform={`translate(${p.x} ${p.y})`}>
                  <circle
                    r={14 + 5 - p.distanceRelative * 5}
                    stroke="none"
                    fill="grey"
                  />
                  <circle r={14} stroke="none" fill="black" />
                  <text
                    textAnchor="middle"
                    fill="white"
                    fontSize={12}
                    alignmentBaseline="central"
                  >
                    {p.index}
                  </text>
                </g>
              </g>
            ))}
          </g>
        )}
      </g> */}
    </Svg>
  )
}
