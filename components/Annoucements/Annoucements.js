import styled from 'styled-components'
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
import { useCallback, useRef, useState, useEffect } from 'react'
import { CircleButton, Title } from '../Primitives'
import { ScaleInAnimation } from './ScaleInAnimation'
import { useAnnoucement } from './useAnnoucement'
import PortableText from '../PortableText'
import useObservedElement from '../useObservedElement'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'
import { returnCappedLength, returnSegmentsFromLength } from './bubbleHelpers'

const ARROW_WIDTH = 40
const ARROW_HEIGHT = 68
const SVG_PADDING = 90
const SEGMENT_MINLENGTH = 80
const COLLISION_OFFSET = 60
const BASESHAPE_RADIUS = 40
const BASESHAPE_INSET = 10

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
  width: ${ARROW_WIDTH}px;
  height: ${ARROW_HEIGHT}px;
`

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  position: absolute;
  display: block;
  pointer-events: none;
  /* outline: 2px solid green; */
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
  width: clamp(24rem, calc(100vw - ${COLLISION_OFFSET * 2}px), 70rem);
  padding: var(--padding-page);
  color: var(--color-txt);
  pointer-events: auto;
  > * {
    margin: 0.5em 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  outline: 1px solid red;
  > * {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
`

const SvgBubble = ({ bubbleProps, arrowPathProps }) => {
  const [layout, setLayout] = useState(null)
  const onBaseRectResize = useCallback((dimensions, baseRect) => {
    const totalLength = baseRect.getTotalLength()
    console.log('onBaseRectResize', totalLength)
    const segments = returnSegmentsFromLength(totalLength, SEGMENT_MINLENGTH)
    const centerPoints = segments.map((segmentLength, index) => {
      const baseLength = segmentLength * (index + 1)
      const pointLength = baseLength
      const pointLengthCapped = returnCappedLength(pointLength, totalLength)
      return baseRect.getPointAtLength(pointLengthCapped)
    })
    const newLayout = {
      totalLength,
      segments,
      centerPoints,
    }
    setLayout(newLayout)
  }, [])

  const [baseRectRef] = useObservedElement(onBaseRectResize)

  return (
    <Svg {...bubbleProps.svg} id="bubble-svg">
      {['outside', 'inside'].map((className) => (
        <g className={className} key={className}>
          <path {...arrowPathProps} />

          {layout && (
            <>
              {layout.centerPoints.map((point, pointIndex) => (
                <circle key={pointIndex} cx={point.x} cy={point.y} r={50} />
              ))}
            </>
          )}
        </g>
      ))}
      <rect
        {...bubbleProps.baseRect}
        ref={baseRectRef}
        id="bubble-base-rect"
        className="inside"
      />
    </Svg>
  )
}

export const Annoucements = () => {
  const [bubbleProps, setBubbleProps] = useState(null)

  const onFloatingResize = useCallback((rect) => {
    const w = SVG_PADDING * 2 + rect.width
    const h = SVG_PADDING * 2 + rect.height
    const newBubbleProps = {
      svg: {
        width: w,
        height: h,
        viewBox: `0 0 ${w} ${h}`,
        style: {
          position: 'absolute',
          top: 0 - SVG_PADDING,
          left: 0 - SVG_PADDING,
        },
      },
      baseRect: {
        x: SVG_PADDING + BASESHAPE_INSET,
        y: SVG_PADDING + BASESHAPE_INSET,
        width: rect.width - BASESHAPE_INSET * 2,
        height: rect.height - BASESHAPE_INSET * 2,
        rx: BASESHAPE_RADIUS,
        ry: BASESHAPE_RADIUS,
      },
    }
    setBubbleProps(newBubbleProps)
  }, [])

  const { annoucement, amount, currentIndex, onNextClick, onPreviousClick } =
    useAnnoucement()

  const arrowRef = useRef(null)
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
      offset({ mainAxis: 30 + ARROW_HEIGHT }),
      flip({
        // padding: 30,
      }),
      shift({
        padding: COLLISION_OFFSET,
      }),
      size({
        apply({ rects, availableWidth, elements }) {
          // console.log({ elements, availableWidth })
          // Object.assign(elements.floating.style, {
          //   maxWidth: `${availableWidth}px`,
          // })
          const baseRect = document.getElementById('bubble-base-rect')
          if (baseRect) {
            baseRect.setAttribute('data-test', 'somevalue')
          }
          // Object.assign(elements.floating.attributes, {
          //   'data-test': 'somevalue',
          // })
          onFloatingResize(rects.floating)
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
    [staticSide]: `-${ARROW_HEIGHT}px`,
  }

  const arrowPathProps = {
    d: getArrowPath({ x: arrowX, y: arrowY }),
  }

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
            <ScaleInAnimation
              style={{
                transformOrigin: 'var(--annoucement-transform-origin)',
              }}
            >
              <Arrow ref={arrowRef} style={arrowStyle} />
              {bubbleProps && (
                <SvgBubble
                  bubbleProps={bubbleProps}
                  arrowPathProps={arrowPathProps}
                />
              )}
              <ContentWrap>
                <Actions>
                  <button onClick={onPreviousClick}>{'<'}</button>
                  <span>{`${currentIndex + 1} / ${amount}`}</span>
                  <button onClick={onNextClick}>{'>'}</button>
                </Actions>
                <Title as="h1">{annoucement.title}</Title>
                <PortableText value={annoucement.content} />
              </ContentWrap>
            </ScaleInAnimation>
          </Floating>
        </FloatingFocusManager>
      )}
    </>
  )
}
