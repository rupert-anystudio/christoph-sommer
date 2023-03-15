import { useState, useRef, useCallback } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'

if (typeof window !== 'undefined') {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver
  }
}

export const useObservedElements = (cb = () => {}) => {
  const [dimensions, setDimensions] = useState(null)

  const onObserve = useCallback(
    (entries) => {
      const measuredEntries = entries.map((entry) => {
        const { target, contentRect } = entry
        const id = target.getAttribute('data-observed-id')
        const group = target.getAttribute('data-observed-group')
        return {
          id,
          group,
          contentRect,
          target,
        }
      })
      if (typeof cb === 'function') {
        cb(measuredEntries)
      }
      const newDimensions = measuredEntries.reduce((acc, entry) => {
        const { contentRect, id, group } = entry
        if (!id || !group) return acc
        const prevGroup = acc[group]
        const { height, width } = contentRect
        acc[group] = {
          ...prevGroup,
          [id]: { width, height },
        }
        return acc
      }, {})
      setDimensions((prevDimensions) => {
        return Object.keys(newDimensions).reduce(
          (acc, key) => {
            const value = {
              ...acc[key],
              ...newDimensions[key],
            }
            acc[key] = value
            return acc
          },
          { ...prevDimensions }
        )
      })
    },
    [setDimensions, cb]
  )

  const observer = useRef(new ResizeObserver(onObserve))

  const returnObservedProps = (group, id) => {
    if (!id || !group) return null
    return {
      'data-observed-group': group,
      'data-observed-id': id,
    }
  }

  return { observer: observer.current, dimensions, returnObservedProps }
}
