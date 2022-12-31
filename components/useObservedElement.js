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
      const element = entries[0]
      const width = element?.contentRect?.width
      const height = element?.contentRect?.height
      if (cb) {
        cb({ width, height }, element)
      }
      setDimensions({ width, height })
    },
    [setDimensions, cb]
  )

  const observer = useRef(new ResizeObserver(onObserve))

  useEffect(() => {
    const el = ref.current
    const ro = observer.current
    if (!el || !ro) return
    ro.observe(el)
    return () => {
      ro.unobserve(el)
    }
  }, [])

  return [ref, dimensions]
}

export default useObservedElement
