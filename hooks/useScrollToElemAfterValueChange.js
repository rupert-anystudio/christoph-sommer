import { useEffect, useRef } from 'react'

const useScrollToElemAfterValueChange = (value) => {
  const wrap = useRef(null)
  useEffect(() => {
    if (!wrap.current) return
    wrap.current.scrollIntoView({
      // behavior: 'smooth',
      // block: 'start',
      behavior: 'auto',
      block: 'start',
      inline: 'nearest',
    })
  }, [value])
  return wrap
}

export default useScrollToElemAfterValueChange
