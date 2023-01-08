import styled from 'styled-components'
import _debounce from 'lodash/debounce'
import { CircleButton } from '../Primitives'
import { ScaleInAnimation } from './ScaleInAnimation'
import { useAnnoucement } from './useAnnoucement'
import { useDebouncedWidthObservation } from './useDebouncedWidthObservation'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'
import PortableText from '../PortableText'

const NotificationWrap = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  top: 28.9%;
  left: 77.6%;
  outline: 1px solid red;
`

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

const BubbleWrap = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  height: auto;
  width: auto;
  display: block;
  --bubble-bg: orange;
`

const BubbleArrow = styled.svg`
  position: relative;
  margin: 0;
  padding: 0;
  display: block;
  width: 3rem;
  height: 6rem;
  transform: translateX(-50%);
  polygon {
    fill: var(--bubble-bg);
  }
`

const BubbleContent = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  display: block;
  background: var(--bubble-bg);
  width: auto;
  padding: 2rem;
  text-align: center;
  transform: translateX(-50%);
  width: clamp(28rem, 80vw, 70rem);
`

const useElementRect = (isResizing) => {
  const ref = useRef(null)

  const [position, setPosition] = useState({})

  useEffect(() => {
    const element = ref?.current
    if (!element) return
    if (isResizing) return
    const rect = element.getBoundingClientRect()
    setPosition(rect)
  }, [isResizing])

  return [ref, position]
}

const PADDING = 20

const getLayout = (rect, viewportWidth) => {
  if (!rect) return null
  if (viewportWidth < 0) return null
  const { width, left } = rect
  const x = 0 - width / 2 - left + PADDING
  return {
    x,
    width: viewportWidth - PADDING * 2,
  }
}

export const Annoucements = () => {
  const [annoucement, amount] = useAnnoucement()

  const [measureRef, viewportWidth, isResizing] = useDebouncedWidthObservation()

  const [notificationRef, notificationRect] = useElementRect(isResizing)

  const layout = getLayout(notificationRect, viewportWidth)

  return (
    <>
      <Measured ref={measureRef} />
      <NotificationWrap ref={notificationRef}>
        <ScaleInAnimation>
          <CircleButton>{amount}</CircleButton>
        </ScaleInAnimation>
        {layout && (
          <BubbleWrap>
            <BubbleArrow viewBox={'0 0 30 10'} preserveAspectRatio={'none'}>
              <polygon points={'0,10 30,10 15,0'} />
            </BubbleArrow>
            <BubbleContent
              style={
                {
                  // transform: `translateX(${layout.x}px)`,
                  // marginLeft: layout.x,
                  // width: layout.width,
                }
              }
            >
              <PortableText value={annoucement.content} />
            </BubbleContent>
          </BubbleWrap>
        )}
      </NotificationWrap>
    </>
  )
}
