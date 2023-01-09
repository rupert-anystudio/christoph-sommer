import styled, { keyframes } from 'styled-components'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  arrow,
  size,
} from '@floating-ui/react'
import { CircleButton, Title } from '../Primitives'
import { ScaleInAnimation } from './ScaleInAnimation'
import { useAnnoucement } from './useAnnoucement'
import { useCallback, useEffect, useRef, useState } from 'react'
import PortableText from '../PortableText'
import { returnLayoutFromElement } from './bubbleHelpers'

const ARROW_WIDTH = 40
const ARROW_HEIGHT = 68
const SVG_PADDING = 90

const getArrowPath = (start) => {
  const points = [
    [SVG_PADDING + start.x, SVG_PADDING],
    [ARROW_WIDTH / 2, ARROW_HEIGHT * -1],
    [ARROW_WIDTH / 2, ARROW_HEIGHT],
  ]
  return points
    .map((point, i) => {
      const [x, y] = point
      if (i === 0) return `M ${x},${y}`
      const step = `l ${x},${y}`
      if (i === points.length - 1) return `${step} Z`
      return step
    })
    .join(' ')
}

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

const ScaleIn = styled.div`
  transform-origin: var(--annoucement-transform-origin);
  position: relative;
  animation: ${scaleIn} 0.2s ease-out;
`

const NotificationWrap = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  top: 28.9%;
  left: 77.6%;
`

const Floating = styled.div`
  position: relative;
`

const Arrow = styled.div`
  position: absolute;
  display: block;
  width: ${ARROW_WIDTH / 10}rem;
  height: ${ARROW_HEIGHT / 10}rem;
  /* outline: 2px solid var(--color-txt); */
`

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  position: absolute;
  display: block;
  pointer-events: none;
  outline: 2px solid green;
  .inside {
    fill: var(--color-bg);
    stroke: var(--color-bg);
    stroke-width: 1;
  }
  .outside {
    fill: var(--color-txt);
    stroke: var(--color-txt);
    stroke-width: 12;
  }
`

const ContentWrap = styled.div`
  position: relative;
  width: clamp(24rem, calc(100vw - 60px), 70rem);
  padding: var(--padding-page);
  color: var(--color-txt);
  pointer-events: auto;
  /* background: red; */
`

export const Annoucements = () => {
  const [bubbleProps, setBubbleProps] = useState(null)
  const onFloatingResize = useCallback((rects) => {
    console.log(rects)
    const w = SVG_PADDING * 2 + rects.floating.width
    const h = SVG_PADDING * 2 + rects.floating.height
    const newBubbleProps = {
      svg: {
        width: `${w}px`,
        height: `${h}px`,
        viewBox: `0 0 ${w} ${h}`,
        style: {
          position: 'absolute',
          top: `-${SVG_PADDING}px`,
          left: `-${SVG_PADDING}px`,
        },
      },
      baseRect: {
        x: SVG_PADDING,
        y: SVG_PADDING,
        width: rects.floating.width,
        height: rects.floating.height,
        rx: 40,
        ry: 40,
      },
    }
    setBubbleProps(newBubbleProps)
  }, [])

  const [annoucement, amount] = useAnnoucement()

  const arrowRef = useRef(null)
  const baseRectRef = useRef(null)
  // popover state
  const [open, setOpen] = useState(false)
  // floating ui wiring
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement: floatingPlacement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement: 'top',
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 20 + ARROW_HEIGHT }),
      flip({
        // padding: 30,
      }),
      shift({
        padding: 30,
      }),
      size({
        apply({ rects, availableWidth, elements }) {
          // console.log({ elements, availableWidth })
          // Object.assign(elements.floating.style, {
          //   maxWidth: `${availableWidth}px`,
          // })
          onFloatingResize(rects)
        },
      }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })
  // set up interactions
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[floatingPlacement.split('-')[0]]

  const arrowStyle = {
    position: 'absolute',
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
    [staticSide]: `-${ARROW_HEIGHT / 10}rem`,
  }

  const arrowPathProps = {
    d: getArrowPath({ x: arrowX, y: arrowY }),
  }

  const [layout, setLayout] = useState(null)

  useEffect(() => {
    const baseRect = baseRectRef.current
    if (!baseRect) return
    const newLayout = returnLayoutFromElement(baseRect)
    setLayout(newLayout)
  }, [bubbleProps])

  return (
    <>
      <NotificationWrap {...getReferenceProps({ ref: reference })}>
        <ScaleInAnimation>
          <CircleButton>{amount}</CircleButton>
        </ScaleInAnimation>
      </NotificationWrap>
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <Floating
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                '--annoucement-transform-origin': `${
                  arrowX != null ? `${arrowX + ARROW_WIDTH / 2}px` : 'center'
                } -${ARROW_HEIGHT}px`,
              },
            })}
          >
            <ScaleIn>
              <Arrow ref={arrowRef} style={arrowStyle} />
              {bubbleProps && (
                <Svg {...bubbleProps.svg}>
                  {['outside', 'inside'].map((className) => (
                    <g className={className} key={className}>
                      <path {...arrowPathProps} />
                      <rect {...bubbleProps.baseRect} ref={baseRectRef} />
                    </g>
                  ))}
                  {layout && (
                    <>
                      <path d={layout.bubblePath} />
                    </>
                  )}
                </Svg>
              )}
              <ContentWrap>
                <Title as="h1">{annoucement.title}</Title>
                <PortableText value={annoucement.content} />
              </ContentWrap>
            </ScaleIn>
          </Floating>
        </FloatingFocusManager>
      )}
    </>
  )
}
