import React, { useRef } from 'react'
import { useCallback } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import _throttle from 'lodash/throttle'
import _debounce from 'lodash/debounce'
import useObservedElement from '../useObservedElement'
import { useState } from 'react'
import { useDeferredValue } from 'react'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'

const Measured = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 5px;
  background: red;
  z-index: 1000;
  @media (min-width: 800px) {
    height: 10px;
    background: blue;
  }
`

const Metrics = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 10px;
  background: var(--color-bg);
  border: 1px solid var(--color-txt);
  color: var(--color-txt);
  z-index: 1000;
`

const Metric = styled.p`
  color: ${(p) => (p.isSame ? 'inherit' : 'red')};
  /* transform: scale(${(p) => (p.isSame ? 1 : 0.2)}); */
`

const THROTTLE = 100
const THROTTLE_OPTIONS = { trailing: false }
const DEBOUNCE = 200

export const MeasureDummy = ({ onUpdate }) => {
  const [isResizing, setIsResizing] = useState(true)
  const [width, setWidth] = useState(-1)

  const updateWidth = useCallback((value) => {
    setWidth(value)
    setIsResizing(false)
  }, [])

  const updateWidthDebounced = useRef(_debounce(updateWidth, DEBOUNCE))

  const onResize = useCallback((dimensions) => {
    setIsResizing(true)
    updateWidthDebounced.current(dimensions.width)
  }, [])

  const [ref] = useObservedElement(onResize)

  useIsomorphicLayoutEffect(() => {
    const state = {
      isResizing,
      width,
    }
    if (typeof onUpdate === 'function') {
      onUpdate(state)
    }
  }, [width, isResizing])

  return (
    <>
      <Measured ref={ref} />
      <Metrics>
        <p>{`width: ${width}`}</p>
        <p>{`isResizing: ${isResizing ? 'yes' : 'no'}`}</p>
      </Metrics>
    </>
  )
}

export const MeasureDummyBloat = () => {
  const [isResizing, setIsResizing] = useState(true)

  const [width, setWidth] = useState(-1)

  const [debouncedWidth, setDebouncedWidth_] = useState(width)
  const setDebouncedWidth = useRef(_debounce(setDebouncedWidth_, DEBOUNCE))

  const onResize = useCallback((dimensions) => {
    const w = dimensions.width
    setIsResizing(true)
    setWidth(w)
    setDebouncedWidth.current(w)
  }, [])

  const [ref] = useObservedElement(onResize)

  useIsomorphicLayoutEffect(() => {
    if (width !== debouncedWidth) return
    setIsResizing(false)
  }, [width, debouncedWidth])

  useIsomorphicLayoutEffect(() => {
    const state = {
      isResizing,
      width: debouncedWidth,
    }
    console.log(state)
  }, [debouncedWidth, isResizing])

  return (
    <>
      <Measured ref={ref} />
      <Metrics>
        <p>{`width: ${width}`}</p>
        <p>{`debouncedWidth: ${debouncedWidth}`}</p>
        <p>{`isResizing: ${isResizing ? 'yes' : 'no'}`}</p>
      </Metrics>
    </>
  )
}

export const MeasureDummyAll = () => {
  const [width, setWidth] = useState(-1)

  const [throttledWidth, setThrottledWidth_] = useState(width)
  const setThrottledWidth = useRef(
    _throttle(setThrottledWidth_, THROTTLE, THROTTLE_OPTIONS)
  )

  const [debouncedWidth, setDebouncedWidth_] = useState(width)
  const setDebouncedWidth = useRef(_debounce(setDebouncedWidth_, DEBOUNCE))

  const [combinedWidth, setCombinedWidth_] = useState(width)
  const setCombinedWidthThrottled = useRef(
    _throttle(setCombinedWidth_, THROTTLE, THROTTLE_OPTIONS)
  )
  const setCombinedWidthDebounced = useRef(
    _debounce(setCombinedWidth_, DEBOUNCE)
  )

  const onResize = useCallback((dimensions) => {
    const w = dimensions.width

    setWidth(w)

    setThrottledWidth.current(w)
    setDebouncedWidth.current(w)

    setCombinedWidthThrottled.current(w)
    setCombinedWidthDebounced.current(w)
  }, [])

  const [ref] = useObservedElement(onResize)

  return (
    <>
      <Measured ref={ref} />
      <Metrics>
        <p>{`width: ${width}`}</p>
        <Metric
          isSame={throttledWidth === width}
        >{`throttledWidth: ${throttledWidth}`}</Metric>
        <Metric
          isSame={debouncedWidth === width}
        >{`debouncedWidth: ${debouncedWidth}`}</Metric>
        <Metric
          isSame={combinedWidth === width}
        >{`combinedWidth: ${combinedWidth}`}</Metric>
      </Metrics>
    </>
  )
}
