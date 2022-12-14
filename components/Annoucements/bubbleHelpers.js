import { useCallback } from 'react'
import { useRef } from 'react'

export const springConfig = {
  tension: 220,
  friction: 14,
  precision: 0.001,
}

export const returnSegmentsFromLength = (
  totalLength,
  minLength = 80,
  fixedAmount = undefined
) => {
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

export const useStoredDeviationGetter = (amount) => {
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
