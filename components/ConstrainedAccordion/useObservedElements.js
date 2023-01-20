import { useState, useRef, useCallback } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'

if (typeof window !== 'undefined') {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver
  }
}

export const useObservedElements = () => {
  const [dimensions, setDimensions] = useState(null)

  const onObserve = useCallback(
    (entries) => {
      const newDimensions = entries.reduce((acc, entry) => {
        console.log({ entry })
        const { target, contentRect } = entry
        const id = target.getAttribute('data-observed-id')
        const group = target.getAttribute('data-observed-group')
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
    [setDimensions]
  )

  const observer = useRef(new ResizeObserver(onObserve))

  return { observer: observer.current, dimensions }
}
