import { useState, useCallback, useRef } from 'react'
import ObservedElementDimensionsContext from './ObservedElementDimensionsContext'
import { ResizeObserver } from '@juggle/resize-observer'

if (typeof window !== 'undefined') {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver
  }
}

const ObservedElementDimensionsProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState({})

  const onObserve = useCallback(
    (entries) => {
      const newDimensions = entries.reduce((acc, entry) => {
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
      setDimensions((prevDimensions) => ({
        ...prevDimensions,
        ...newDimensions,
      }))
    },
    [setDimensions]
  )

  const observer = useRef(new ResizeObserver(onObserve))

  return (
    <ObservedElementDimensionsContext.Provider
      value={{
        dimensions,
        observer: observer.current,
      }}
    >
      {children}
    </ObservedElementDimensionsContext.Provider>
  )
}

export default ObservedElementDimensionsProvider
