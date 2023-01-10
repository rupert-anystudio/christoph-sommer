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
  useTransitionStyles,
  useTransitionStatus,
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
  returnPointBetweenPoints,
  returnVectorFromPoints,
  returnDistanceBetweenPoints,
  returnAngleFromVector,
  useStoredDeviationGetter,
} from './bubbleHelpers'
import useObservedElement from '../useObservedElement'
import { Svg } from './Svg'
import { PullRelease } from './PullRelease'

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
  pointer-events: none;
`

const ContentWrap = styled.div`
  position: relative;
  width: clamp(24rem, calc(100vw - ${COLLISION_OFFSET * 2}px), 70rem);
  padding: var(--padding-page);
  margin-bottom: var(--padding-page);
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

const BubbleSvg = ({ svg, baseRect, arrowPath }) => {
  const [layout, setLayout] = useState(null)

  const sideDeviation = useStoredDeviationGetter(20)

  const onBaseRectResize = useCallback(
    (dimensions, baseElem) => {
      const totalLength = baseElem.getTotalLength()

      const segments = returnSegmentsFromLength(totalLength, SEGMENT_MINLENGTH)

      const points = segments.map((segmentLength, index) => {
        const baseLength = segmentLength * (index + 1)
        const deviation = sideDeviation(index)
        const pointLength = baseLength + deviation
        const pointLengthCapped = returnCappedLength(pointLength, totalLength)
        return baseElem.getPointAtLength(pointLengthCapped)
      })

      const arcPoints = points.map((end, index) => {
        const start =
          index === 0 ? points[points.length - 1] : points[index - 1]
        const mid = returnPointBetweenPoints(start, end)
        const normal = returnVectorFromPoints(start, end)
        const distance = returnDistanceBetweenPoints(start, end)
        return {
          start,
          mid,
          end,
          normal,
          distance,
        }
      })

      const bubblePath = arcPoints
        .map((p, i) => {
          const rotation = returnAngleFromVector(p.normal)
          let segment = '0,1'
          // segment = i % 2 !== 0 ? '0,1' : '0,0'
          const radius = Math.ceil(p.distance / 2)
          const ra = radius * 1.05
          const rb = radius * 1.05
          const end = `${p.end.x},${p.end.y}`
          const arc = `A ${ra},${rb} ${rotation} ${segment} ${end}`
          if (i === 0) return `M ${p.start.x},${p.start.y} ${arc}`
          if (i === arcPoints.length - 1) return `${arc} Z`
          return arc
        })
        .filter(Boolean)
        .join(' ')

      setLayout({ points, arcPoints, bubblePath })
    },
    [sideDeviation]
  )

  const [baseRectRef] = useObservedElement(onBaseRectResize)

  return (
    <Svg {...svg}>
      <rect ref={baseRectRef} {...baseRect} fill="none" stroke="none" />
      {layout && (
        <>
          {['outside', 'inside'].map((className) => (
            <g className={className} key={className}>
              <path d={layout.bubblePath} />
              <path d={arrowPath} />
            </g>
          ))}
          {/* <g>
            <rect {...baseRect} fill="none" stroke="red" />
            {layout.arcPoints.map((arcPoint, pointIndex) => (
              <circle
                key={pointIndex}
                cx={arcPoint.end.x}
                cy={arcPoint.end.y}
                r={5}
                stroke="none"
                fill="black"
              />
            ))}
          </g> */}
        </>
      )}
    </Svg>
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
      style: {
        top: -SVG_PADDING,
        left: -SVG_PADDING,
      },
    }
    const baseRect = {
      width: rect.width - BASESHAPE_INSET * 2,
      height: rect.height - BASESHAPE_INSET * 2,
      x: SVG_PADDING + BASESHAPE_INSET,
      y: SVG_PADDING + BASESHAPE_INSET,
      rx: BASESHAPE_RADIUS,
      ry: BASESHAPE_RADIUS,
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
  // set up unmounting/mounting transition
  const { isMounted, status } = useTransitionStatus(context, {
    duration: 1000,
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

  console.log({ status })

  return (
    <>
      <NotificationWrap {...getReferenceProps({ ref: reference })}>
        <ScaleInAnimation>
          <CircleButton>{amount}</CircleButton>
        </ScaleInAnimation>
      </NotificationWrap>
      {isMounted && (
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
              isHidden={status !== 'open'}
              style={{
                transformOrigin: 'var(--annoucement-transform-origin)',
              }}
            >
              <PullRelease>
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
              </PullRelease>
            </ScaleInAnimation>
          </Floating>
        </FloatingFocusManager>
      )}
    </>
  )
}
