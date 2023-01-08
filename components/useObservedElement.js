import { useEffect, useState, useRef, useCallback } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'

if (typeof window !== 'undefined') {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver
  }
}

const useObservedElement = (cb) => {
  const ref = useRef(null)
  const [dimensions, setDimensions] = useState()

  const onObserve = useCallback(
    (entries) => {
      const { contentRect, target } = entries[0]
      const { width, height, top, left, x, y } = contentRect
      const newdimensions = { width, height, top, left, x, y }
      if (cb) {
        cb(newdimensions, target)
      }
      setDimensions(newdimensions)
    },
    [setDimensions, cb]
  )

  const observer = useRef(new ResizeObserver(onObserve))

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = observer.current
    // if (!el || !ro) return
    ro.observe(el)
    return () => {
      ro.unobserve(el)
    }
  }, [])

  return [ref, dimensions]
}

export default useObservedElement
