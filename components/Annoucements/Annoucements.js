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
import { useCallback, useRef, useState } from 'react'
import { CircleButton, Title } from '../Primitives'
import { ScaleInAnimation } from './ScaleInAnimation'
import { useAnnoucement } from './useAnnoucement'
import PortableText from '../PortableText'
import { Actions } from './Actions'
import {
  ARROW_WIDTH,
  ARROW_HEIGHT,
  ARROW_OFFSET,
  SVG_PADDING,
  COLLISION_OFFSET,
  BASESHAPE_RADIUS,
  BASESHAPE_INSET,
  SEGMENT_MINLENGTH,
  returnSegmentsFromLength,
  returnCappedLength,
} from './bubbleHelpers'
import useObservedElement from '../useObservedElement'

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

const ContentWrap = styled.div`
  position: relative;
  width: clamp(24rem, calc(100vw - ${COLLISION_OFFSET * 2}px), 70rem);
  padding: var(--padding-page);
  color: var(--color-txt);
  pointer-events: auto;
  outline: 1px solid red;
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

const BubbleSvg = ({ svg, baseRect, arrowPath }) => {
  const [points, setPoints] = useState([])

  const onBaseRectResize = useCallback((dimensions, baseElem) => {
    const totalLength = baseElem.getTotalLength()
    console.log({ totalLength })

    const segments = returnSegmentsFromLength(totalLength, SEGMENT_MINLENGTH)
    const newPoints = segments.map((segmentLength, index) => {
      const baseLength = segmentLength * (index + 1)
      const pointLength = baseLength
      const pointLengthCapped = returnCappedLength(pointLength, totalLength)
      return baseElem.getPointAtLength(pointLengthCapped)
    })
    setPoints(newPoints)
  }, [])

  const [baseRectRef] = useObservedElement(onBaseRectResize)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        top: -SVG_PADDING,
        left: -SVG_PADDING,
        // width: `calc(100% + ${SVG_PADDING * 2}px)`,
        // height: `calc(100% + ${SVG_PADDING * 2}px)`,
        outline: '1px solid red',
      }}
      {...svg}
    >
      <rect
        ref={baseRectRef}
        x={SVG_PADDING + BASESHAPE_INSET}
        y={SVG_PADDING + BASESHAPE_INSET}
        rx={BASESHAPE_RADIUS}
        ry={BASESHAPE_RADIUS}
        {...baseRect}
      />
      {['outside', 'inside'].map((className) => (
        <g className={className} key={className}>
          {points.map((point, pointIndex) => (
            <circle key={pointIndex} cx={point.x} cy={point.y} r={50} />
          ))}
          <path d={arrowPath} />
        </g>
      ))}
    </svg>
  )
}

export const Annoucements = () => {
  const [bubbleProps, setBubbleProps] = useState(null)

  const onFloatingResize = useCallback((rect) => {
    const viewBox = `0 0 ${SVG_PADDING * 2 + rect.width} ${
      SVG_PADDING * 2 + rect.height
    }`
    const svg = {
      width: rect.width + SVG_PADDING * 2,
      height: rect.height + SVG_PADDING * 2,
      viewBox,
    }
    const baseRect = {
      width: rect.width - BASESHAPE_INSET * 2,
      height: rect.height - BASESHAPE_INSET * 2,
    }
    const newBubbleProps = {
      svg,
      baseRect,
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
      offset({ mainAxis: ARROW_OFFSET + ARROW_HEIGHT }),
      flip({
        // padding: 30,
      }),
      shift({
        padding: COLLISION_OFFSET,
      }),
      size({
        apply({ rects, availableWidth, elements }) {
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

  const arrowPath = getArrowPath({ x: arrowX, y: arrowY })

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
                <BubbleSvg {...bubbleProps} arrowPath={arrowPath} />
              )}
              <ContentWrap>
                <Actions
                  onPreviousClick={onPreviousClick}
                  onNextClick={onNextClick}
                  currentIndex={currentIndex}
                  amount={amount}
                />
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
