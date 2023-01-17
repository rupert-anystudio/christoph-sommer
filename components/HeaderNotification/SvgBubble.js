import { useIsomorphicLayoutEffect } from '@react-spring/web'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import useObservedElement from '../useObservedElement'

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
  outline: 1px solid red;
  pointer-events: none;
`

const BaseRect = styled.rect`
  fill: none;
  stroke: none;
`

const BubblePath = styled.path`
  fill: var(--color-bg);
  stroke: none;
`

const useBubblePoints = () => {
  const [bubblePoints, setBubblePoints] = useState(null)
  const [bubblePointGroups, setBubblePointGroups] = useState(null)
  const onBaseElemResize = useCallback((dimensions, element) => {
    const pointDeviation = 15
    const pointAmount = 18
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
        const ra = radius * 1.02
        const rb = radius * 1.02
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
      x: x + arrowX + arrowSize / 2,
      y: y + height + arrowSize,
    }),
  },
  right: {
    getArrowPoint: ({ x, y, arrowSize, arrowY }) => ({
      x: x - arrowSize,
      y: y + arrowY + arrowSize / 2,
    }),
  },
  bottom: {
    getArrowPoint: ({ x, y, arrowSize, arrowX }) => ({
      x: x + arrowX + arrowSize / 2,
      y: y - arrowSize,
    }),
  },
  left: {
    getArrowPoint: ({ x, y, arrowSize, width, arrowY }) => ({
      x: x + width + arrowSize,
      y: y + arrowY + arrowSize / 2,
    }),
  },
}

const useArrowTip = ({ baseRectProps = {}, arrowState = {} }) => {
  const { arrowX, arrowY, currentSide, arrowSize } = arrowState
  if (typeof arrowX !== 'number' && typeof arrowY !== 'number') return null
  const { x, y, width, height } = baseRectProps
  const side = sides[currentSide]
  if (!side) return null
  return side.getArrowPoint({ x, y, width, height, arrowX, arrowY, arrowSize })
}

const useArrowPoints = ({ arrowTip, bubblePointGroups }) => {
  if (!arrowTip || !bubblePointGroups || !bubblePointGroups.length) return null
  const closestPoints = bubblePointGroups
    .map((p, index) => ({
      x: p.mid.x,
      y: p.mid.y,
      distanceToArrowTip: returnDistanceBetweenPoints(p.mid, arrowTip),
      index,
    }))
    .sort((a, b) => a.distanceToArrowTip - b.distanceToArrowTip)
    .slice(0, 2)
    .sort((a, b) => a.index - b.index)
    .map(({ x, y }) => ({ x, y }))

  return [closestPoints[0], arrowTip, closestPoints[closestPoints.length - 1]]
}

const useArrowPath = ({ arrowPoints }) => {
  if (!arrowPoints) return null
  // prettier-ignore
  return arrowPoints.map((p, index) => {
    const position = `${p.x},${p.y}`
    if (index === 0) return `M ${position}`
    if (index === arrowPoints.length - 1) return `L ${position} Z`
    return `L ${position}`
  }).join(' ')
}

export const SvgBubble = ({ svgProps, baseRectProps, arrowState }) => {
  const arrowTip = useArrowTip({ baseRectProps, arrowState })
  const { baseElemRef, bubblePoints, bubblePointGroups } = useBubblePoints()
  const arrowPoints = useArrowPoints({ arrowTip, bubblePointGroups })
  const arrowPath = useArrowPath({ arrowPoints })
  const bubblePath = useBubblePath({ bubblePointGroups })
  return (
    <Svg {...svgProps}>
      <BaseRect ref={baseElemRef} {...baseRectProps} rx={30} ry={30} />
      {arrowPath && <BubblePath d={arrowPath} />}
      {bubblePath && <BubblePath d={bubblePath} />}
      {arrowTip && (
        <circle
          cx={arrowTip.x}
          cy={arrowTip.y}
          r={8}
          stroke="none"
          fill="black"
        />
      )}
      <g style={{ display: 'none' }}>
        {bubblePoints && (
          <g>
            {bubblePoints.map((p, pIndex) => (
              <circle
                key={pIndex}
                cx={p.x}
                cy={p.y}
                r={8}
                stroke="none"
                fill="black"
              />
            ))}
          </g>
        )}
        {arrowPoints && (
          <g>
            {arrowPoints.map((p, pIndex) => (
              <g key={pIndex}>
                <circle cx={p.x} cy={p.y} r={12} stroke="none" fill="red" />
              </g>
            ))}
          </g>
        )}
      </g>
    </Svg>
  )
}
