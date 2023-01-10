export const ARROW_WIDTH = 40
export const ARROW_HEIGHT = 68
export const ARROW_OFFSET = 0
export const SVG_PADDING = 90
export const COLLISION_OFFSET = 60
export const BASESHAPE_RADIUS = 40
export const BASESHAPE_INSET = 10
export const SEGMENT_MINLENGTH = 80

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

const padding = 120
const borderRadius = 70
const segmentMinLength = 90
const deviationSide = 5
const deviationPerpendicular = 10

export const returnLayoutFromElement = (element) => {
  const totalLength = element.getTotalLength()
  // const centerPoint = { x: width / 2 + padding, y: height / 2 + padding }
  const segments = returnSegmentsFromLength(totalLength, segmentMinLength)
  const pointsOnBaseShape = segments.map((segmentLength, index) => {
    const baseLength = segmentLength * (index + 1)
    // const deviation = sideDeviation(index) // * 0 // DISABLED
    // const pointLength = baseLength + deviation
    const pointLength = baseLength
    const pointLengthCapped = returnCappedLength(pointLength, totalLength)
    return element.getPointAtLength(pointLengthCapped)
  })
  const transformedPoints = pointsOnBaseShape.map((point, index) => {
    // const deviation = perpendicularDeviation(index) * 0 // DISABLED
    // const normalFromCenter = returnNormalizedVector({
    //   x: point.x - centerPoint.x,
    //   y: point.y - centerPoint.y,
    // })
    return {
      x: point.x,
      y: point.y,
    }
    // return {
    //   x: point.x + normalFromCenter.x * deviation,
    //   y: point.y + normalFromCenter.y * deviation,
    // }
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
