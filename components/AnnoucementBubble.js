import { useDeferredValue } from 'react'
import { useEffect, useRef, useCallback, useState } from 'react'
import styled from 'styled-components'
import useObservedElement from './useObservedElement'

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  position: absolute;
  outline: 2px solid green;
  rect {
    outline: 2px solid green;
  }
`

const BubbleShape = styled.path`
  fill: var(--color-bg);
  /* stroke: var(--color-txt);
  stroke-width: 4; */
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

const Circle = ({ x, y, ...rest }) => {
  return <circle cx={x} cy={y} r={4} fill="red" stroke="none" {...rest} />
}

const AnnoucementBubble = ({ width, height, padding, borderRadius = 40 }) => {
  const handleObservedResize = (dimensions, element) => {
    const length = element.target.getTotalLength()
    console.log('handleObserve')
    console.log({ length })
  }
  const [observedRef] = useObservedElement(handleObservedResize)
  const baseRef = useRef()

  const returnStage = useCallback(() => {
    const svg = returnSvgProps({
      width,
      height,
      padding,
      borderRadius,
    })
    const baseShape = returnBaseShapeProps({
      width,
      height,
      padding,
      borderRadius,
    })
    return { svg, baseShape }
  }, [width, height, padding, borderRadius])

  const [stage, setStage] = useState(returnStage())

  useEffect(() => {
    setStage(returnStage())
  }, [returnStage])

  const [layout, setLayout] = useState()

  const returnTotalLength = useCallback(() => {
    if (!baseRef.current) return null
    return baseRef.current.getTotalLength()
  }, [])

  const returnPointAtLength = useCallback(
    (length) => {
      const totalLength = returnTotalLength()
      if (!totalLength) return null
      const cappedLength = returnCappedLength(length, totalLength)
      return baseRef.current.getPointAtLength(cappedLength)
    },
    [returnTotalLength]
  )

  const returnCenterPoint = useCallback(() => {
    return { x: stage.svg.width / 2, y: stage.svg.height / 2 }
  }, [stage])

  const returnEndPointsFromSegments = useCallback(
    (segments) => {
      return segments.map((segmentLength, index) => {
        const pointLength = segmentLength * (index + 1)
        return returnPointAtLength(pointLength)
      })
    },
    [returnPointAtLength]
  )

  const returnShapePoints = useCallback(
    (points) => {
      const center = returnCenterPoint()
      return points.map((end, index) => {
        const start =
          index === 0 ? points[points.length - 1] : points[index - 1]
        const mid = returnPointBetweenPoints(start, end)
        const normal = returnVectorFromPoints(center, mid)
        const distance = returnDistanceBetweenPoints(start, end)
        return {
          start,
          mid,
          end,
          normal,
          distance,
        }
      })
    },
    [returnCenterPoint]
  )

  const renderLayout = useCallback(() => {
    const centerPoint = returnCenterPoint()
    const totalLength = returnTotalLength()
    const segments = returnSegmentsFromLength(totalLength)
    const endPoints = returnEndPointsFromSegments(segments)
    const shapePoints = returnShapePoints(endPoints)
    console.log('renderLayout')
    console.log({ totalLength })
    setLayout({
      centerPoint,
      totalLength,
      segments,
      endPoints,
      shapePoints,
    })
  }, [
    returnCenterPoint,
    returnTotalLength,
    returnEndPointsFromSegments,
    returnShapePoints,
  ])

  useEffect(() => {
    renderLayout()
    // let timeout = setTimeout(renderLayout, 1)
    // return () => {
    //   clearTimeout(timeout)
    // }
  }, [stage, renderLayout])

  // useEffect(() => {
  //   const baseEl = baseRef.current
  //   if (!baseEl) return

  //   const totalLength = baseEl.getTotalLength()

  //   const centerPoint = { x: width / 2 + padding, y: height / 2 + padding }

  //   const segments = returnSegmentsFromLength(totalLength)

  //   const endPoints = segments.map((segmentLength, index) => {
  //     const pointLength = segmentLength * (index + 1)
  //     const pointLengthCapped = returnCappedLength(pointLength, totalLength)
  //     return baseEl.getPointAtLength(pointLengthCapped)
  //   })

  //   const points = endPoints.map((end, index) => {
  //     const start =
  //       index === 0 ? endPoints[endPoints.length - 1] : endPoints[index - 1]
  //     const mid = returnPointBetweenPoints(start, end)
  //     const normal = returnVectorFromPoints(centerPoint, mid)
  //     const distance = returnDistanceBetweenPoints(start, end)
  //     return {
  //       start,
  //       mid,
  //       end,
  //       normal,
  //       distance,
  //     }
  //   })

  //   const d = points
  //     .map((p, i) => {
  //       const rotation = returnAngleFromVector(p.normal)
  //       let segment = '0,1'
  //       // segment = i % 2 !== 0 ? '0,1' : '0,0'
  //       const dampening = 1.1
  //       const radius = (p.distance / 2) * dampening
  //       const ra = radius * 1
  //       const rb = radius * 1
  //       const end = `${p.end.x},${p.end.y}`
  //       const arc = `A ${ra},${rb} ${rotation} ${segment} ${end}`
  //       if (i === 0) return `M ${p.start.x},${p.start.y} ${arc}`
  //       if (i === points.length - 1) return `${arc} Z`
  //       return arc
  //     })
  //     .filter(Boolean)
  //     .join(' ')

  //   const newLayout = { totalLength, centerPoint, endPoints, points, d }

  //   setLayout(newLayout)
  // }, [width, height, borderRadius, padding])

  // console.log(layout)

  return (
    <Svg {...stage.svg}>
      <defs>
        <rect ref={baseRef} {...stage.baseShape} />
      </defs>
      <rect {...stage.baseShape} ref={observedRef} />
      {layout && (
        <>
          {layout.endPoints.map((p, index) => (
            <Circle key={index} x={p.x} y={p.y} />
          ))}
        </>
      )}
    </Svg>
  )
}

export default AnnoucementBubble
