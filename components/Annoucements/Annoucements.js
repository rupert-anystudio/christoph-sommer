import React, { useState, useRef, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { animated, useSpring } from '@react-spring/web'
import usePagePropsContext from '../../hooks/usePagePropsContext'
import { CircleButton } from '../Primitives'
import AnnoucementContent from './AnnoucementContent'
import useObservedElement from '../useObservedElement'
import {
  returnCappedLength,
  returnPointBetweenPoints,
  returnSegmentsFromLength,
} from './AnnoucementBubble'
import { forwardRef } from 'react'
import { useEffect } from 'react'

const Wrap = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  top: 28.9%;
  left: 77.6%;
`

const Root = styled(PopoverPrimitive.Root)``
const Trigger = PopoverPrimitive.Trigger
const Portal = styled(PopoverPrimitive.Portal)`
  z-index: 300;
`
const Close = styled(PopoverPrimitive.Close)`
  padding: 0;
  margin: 0;
  appearance: none;
  border: none;
  background: none;
  font-size: var(--fs-big);
  color: var(--color-element-txt);
  cursor: pointer;
`
const Arrow = styled(PopoverPrimitive.Arrow)`
  fill: var(--color-bg);
  stroke: none;
  pointer-events: none;
  /* visibility: hidden; */
`
const Content = styled(PopoverPrimitive.Content)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 200;
  width: 90vw;
  /* max-width: 80rem; */
  outline: none;
  --color-bg: black;
  --color-txt: white;
`

const ScaleInAnimation = ({ children }) => {
  const style = useSpring({
    from: {
      scale: 0.1,
    },
    to: {
      scale: 1,
    },
  })
  return <animated.div style={style}>{children}</animated.div>
}

const usePopoverState = () => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (value) => {
    setOpen(value)
  }
  useEffect(() => {
    setOpen(true)
  }, [])
  return [open, handleOpenChange]
}

const useAnnoucement = () => {
  const pageProps = usePagePropsContext()
  const annoucements = pageProps?.annoucements ?? []
  const annoucement = annoucements[0] || {}
  const amount = annoucements.length
  return [annoucement, amount]
}

const LayoutSvgWrap = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  fill: none;
  width: 100%;
  height: 100%;
  /* box-shadow: 5px 10px 20px 0px black; */
  > rect {
    fill: var(--color-bg);
    stroke: none;
    stroke-width: 0;
  }
`

const LayoutSvg = forwardRef(({ onResize, borderRadius = 50 }, ref) => {
  const [rectRef] = useObservedElement(onResize)
  return (
    <LayoutSvgWrap style={{ borderRadius }}>
      <rect ref={rectRef} width="100%" height="100%" rx={borderRadius} />
    </LayoutSvgWrap>
  )
})
LayoutSvg.displayName = 'LayoutSvg'

const ResizeTrigger = ({ onResize }) => {
  const [ref] = useObservedElement(onResize)
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '50vw',
        height: 1,
      }}
    />
  )
}

const SEGMENT_MIN_LENGTH = 80
const PADDING = 190
const ARROW_OFFSET = 30
const ARROW_WIDTH = 30
const ARROW_HEIGHT = 100

const Annoucements = () => {
  const [open, handleOpenChange] = usePopoverState()
  const [annoucement, amount] = useAnnoucement()
  const triggerRef = useRef()
  // const rectRef = useRef()

  const [layout, setLayout] = useState()

  const handleResize = useCallback((dimensions, element) => {
    const elemRect = element.getBoundingClientRect()
    const triggerRect = triggerRef.current.getBoundingClientRect()
    const arrowEnd = {
      x: triggerRect.x - elemRect.x + PADDING + triggerRect.width / 2,
      y:
        triggerRect.y -
        elemRect.y +
        PADDING +
        triggerRect.height +
        ARROW_OFFSET,
    }
    const arrowStart = {
      x: arrowEnd.x,
      // y: PADDING,
      y: arrowEnd.y + ARROW_HEIGHT,
    }
    const arrow = {
      end: arrowEnd,
      start: arrowStart,
    }

    const totalLength = element.getTotalLength()
    const segments = returnSegmentsFromLength(totalLength, SEGMENT_MIN_LENGTH)
    const points = segments.map((length, index) => {
      const start = element.getPointAtLength(
        returnCappedLength(length * index, totalLength)
      )
      const end = element.getPointAtLength(
        returnCappedLength(length * (index + 1), totalLength)
      )
      const mid = returnPointBetweenPoints(start, end)
      return {
        key: index,
        start,
        end,
        mid,
      }
    })
    const newLayout = {
      points,
      arrow,
    }
    setLayout(newLayout)
  }, [])

  return (
    <Wrap>
      <Root open={open} onOpenChange={handleOpenChange}>
        <div ref={triggerRef} style={{ outline: '1px solid red' }}>
          <ScaleInAnimation>
            <Trigger asChild>
              <CircleButton>{amount}</CircleButton>
            </Trigger>
          </ScaleInAnimation>
        </div>
        <Portal>
          <Content
            sideOffset={ARROW_OFFSET}
            collisionPadding={40}
            alignOffset={-60}
            align="start"
          >
            <Arrow width={ARROW_WIDTH} height={ARROW_HEIGHT} />
            <LayoutSvg onResize={handleResize} />
            <AnnoucementContent
              title={annoucement.title}
              content={annoucement.content}
            />
            {layout && (
              <svg
                style={{
                  position: 'absolute',
                  top: -PADDING,
                  left: -PADDING,
                  width: `calc(100% + ${PADDING * 2}px`,
                  height: `calc(100% + ${PADDING * 2}px`,
                  outline: '1px solid grey',
                  pointerEvents: 'none',
                }}
              >
                <circle
                  cx={layout.arrow.end.x}
                  cy={layout.arrow.end.y}
                  r={10}
                  fill="red"
                />
                <circle
                  cx={layout.arrow.start.x}
                  cy={layout.arrow.start.y}
                  r={10}
                  fill="green"
                />
                <g transform={`translate(${PADDING} ${PADDING})`}>
                  {layout.points.map((point) => (
                    <React.Fragment key={point.key}>
                      <circle
                        cx={point.start.x}
                        cy={point.start.y}
                        r={10}
                        fill="red"
                      />
                    </React.Fragment>
                  ))}
                </g>
              </svg>
            )}
          </Content>
        </Portal>
      </Root>
    </Wrap>
  )
}

export default Annoucements
