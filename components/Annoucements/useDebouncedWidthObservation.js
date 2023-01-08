import { useRef } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import _debounce from 'lodash/debounce'
// import _throttle from 'lodash/throttle'
import useObservedElement from '../useObservedElement'

export const useDebouncedWidthObservation = (delay = 60) => {
  const [isResizing, setIsResizing] = useState(true)
  const [width, setWidth] = useState(-1)

  const updateWidth = useCallback((value) => {
    setWidth(value)
    setIsResizing(false)
  }, [])

  // const updateWidthThrottled = useRef(
  //   _throttle(updateWidth, delay, { trailing: false })
  // )
  const updateWidthDebounced = useRef(_debounce(updateWidth, delay))

  const onResize = useCallback((dimensions) => {
    setIsResizing(true)
    // updateWidthThrottled.current(dimensions.width)
    updateWidthDebounced.current(dimensions.width)
  }, [])

  const [ref] = useObservedElement(onResize)

  return [ref, width, isResizing]
}
