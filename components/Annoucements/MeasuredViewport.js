import React from 'react'
import styled from 'styled-components'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'
import { useDebouncedWidthObservation } from './useDebouncedWidthObservation'

const Measured = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 1px;
  background: transparent;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
`

export const MeasuredViewport = ({ onUpdate, delay }) => {
  const [ref, width, isResizing] = useDebouncedWidthObservation(delay)

  useIsomorphicLayoutEffect(() => {
    if (typeof onUpdate !== 'function') return
    const event = {
      isResizing,
      width,
    }
    onUpdate(event)
  }, [width, isResizing, onUpdate])

  return <Measured ref={ref} />
}
