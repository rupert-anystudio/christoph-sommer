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
  FloatingPortal,
  arrow,
  size,
  useTransitionStatus,
  useHover,
  safePolygon,
} from '@floating-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CircleButton, Title } from '../Primitives'
import { ScaleInAnimation } from './ScaleInAnimation'
import { useAnnoucement } from './useAnnoucement'
import PortableText from '../PortableText'
import { Actions } from './Actions'
import {
  animated,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web'
import {
  returnSegmentsFromLength,
  returnCappedLength,
  returnPointBetweenPoints,
  returnVectorFromPoints,
  returnDistanceBetweenPoints,
  returnAngleFromVector,
  springConfig,
  useStoredDeviationGetter,
} from './bubbleHelpers'
import useObservedElement from '../useObservedElement'
import { PullRelease } from './PullRelease'
import { formatIsoDate } from '../../lib/dateHelpers'

const NotificationWrap = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  top: 28.9%;
  left: 78%;
`

const Floating = styled.div`
  position: relative;
`

const Arrow = styled.div`
  position: absolute;
  display: block;
  pointer-events: none;
  /* outline: 1px solid red; */
`

const Content = styled.div`
  position: relative;
  width: clamp(220px, calc(100vw - ${(p) => p.COLLISION_OFFSET * 2}px), 800px);
  padding: var(--padding-page);
  margin-bottom: var(--padding-page);
  color: var(--color-txt);
  pointer-events: none;
  text-align: center;
  /* outline: 1px solid red; */
`

const ContentTitle = styled(Title).attrs({ as: 'h1' })`
  margin-bottom: var(--padding-page);
`

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  position: absolute;
  display: block;
  pointer-events: none;
  .inside {
    fill: var(--color-bg);
    stroke: var(--color-bg);
    stroke-width: 1;
  }
  .outside {
    fill: var(--color-txt);
    stroke: var(--color-txt);
    stroke-width: 12;
    transform: translate3d(0px, 2px, 0);
  }
  polygon,
  path {
    pointer-events: auto;
  }
`

const AnimatedPath = ({ d }) => {
  const [style, api] = useSpring(() => ({
    d,
    config: springConfig,
  }))

  useIsomorphicLayoutEffect(() => {
    api.start({
      d,
    })
  }, [d, api])

  return <animated.path d={style.d} />
}

const BubbleSvg = ({
  svg,
  baseRect,
  pulledArrowPath,
  pullProps,
  SEGMENT_MINLENGTH = 100,
  SEGMENT_AMOUNT = 18,
  POINT_DEVIATION_RANGE = 45,
  START_OFFSET = 70,
}) => {
  const [layout, setLayout] = useState(null)

  const sideDeviation = useStoredDeviationGetter(POINT_DEVIATION_RANGE)
  const layoutCountStore = useRef(0)

  const updateLayoutFromElement = useCallback(
    (element) => {
      const layoutCount = layoutCountStore.current
      layoutCountStore.current = layoutCount + 1
      const totalLength = element.getTotalLength()

      const startOffset = Math.random() * START_OFFSET - START_OFFSET * 2
      // const startOffset = layoutCount * START_OFFSET

      const segments = returnSegmentsFromLength(
        totalLength,
        SEGMENT_MINLENGTH,
        SEGMENT_AMOUNT
      )

      const points = segments.map((segmentLength, index) => {
        const baseLength = segmentLength * (index + 1)
        // const deviation = sideDeviation(index)
        const deviation =
          Math.random() * POINT_DEVIATION_RANGE - POINT_DEVIATION_RANGE * 2
        const pointLength = baseLength + deviation
        const pointLengthCapped = returnCappedLength(pointLength, totalLength)
        return element.getPointAtLength(pointLengthCapped)
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
          const ra = radius * 1.02
          const rb = radius * 1.02
          const end = `${p.end.x},${p.end.y}`
          const arc = `A ${ra},${rb} ${rotation} ${segment} ${end}`
          if (i === 0) return `M ${p.start.x},${p.start.y} ${arc}`
          if (i === arcPoints.length - 1) return `${arc} Z`
          return arc
        })
        .filter(Boolean)
        .join(' ')
      setLayout({
        arcPoints,
        bubblePath,
      })
    },
    [SEGMENT_MINLENGTH, POINT_DEVIATION_RANGE, START_OFFSET, SEGMENT_AMOUNT]
  )

  const onBaseRectResize = useCallback(
    (dimensions, element) => {
      updateLayoutFromElement(element)
    },
    [updateLayoutFromElement]
  )

  const [baseRectRef] = useObservedElement(onBaseRectResize)

  return (
    <Svg {...svg}>
      <rect ref={baseRectRef} {...baseRect} fill="none" stroke="none" />
      {layout && (
        <>
          <g {...pullProps}>
            {['outside', 'inside'].map((className) => (
              <g className={className} key={className}>
                {/* <path d={layout.bubblePath} /> */}
                <AnimatedPath d={layout.bubblePath} />
                <animated.path d={pulledArrowPath} strokeLinejoin="round" />
              </g>
            ))}
          </g>
          {/* <g>
            <rect {...baseRect} fill="none" stroke="red" />
            {layout.arcPoints.map((arcPoint, pointIndex) => (
              <g key={pointIndex}>
                <circle
                  cx={arcPoint.start.x}
                  cy={arcPoint.start.y}
                  r={pointIndex === 0 ? 12 : 5}
                  stroke="none"
                  fill={'black'}
                />
                <circle
                  cx={arcPoint.mid.x}
                  cy={arcPoint.mid.y}
                  r={5}
                  stroke="none"
                  fill={'blue'}
                />
              </g>
            ))}
          </g> */}
        </>
      )}
    </Svg>
  )
}

export const Annoucements = ({
  ARROW_WIDTH = 60,
  ARROW_HEIGHT = 110,
  ARROW_OFFSET = 10,
  SVG_PADDING = 500,
  BASESHAPE_RADIUS = 80,
  BASESHAPE_INSET = 0,
  COLLISION_OFFSET = 60,
  style,
  className,
}) => {
  const arrowRef = useRef(null)
  const [bubbleProps, setBubbleProps] = useState(null)
  const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setOpen(true)
  //   }, 500)
  //   return () => {
  //     clearTimeout(timeout)
  //   }
  // }, [])

  const onFloatingResize = useCallback(
    (rect) => {
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
    },
    [SVG_PADDING, BASESHAPE_RADIUS, BASESHAPE_INSET]
  )

  // prettier-ignore
  const {
    annoucement,
    amount,
    currentIndex,
    onNextClick,
    onPreviousClick,
  } = useAnnoucement()
  // floating ui wiring
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement: floatingPlacement,
    middlewareData,
  } = useFloating({
    strategy: 'fixed',
    placement: 'top-start',
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: ARROW_OFFSET + ARROW_HEIGHT }),
      flip(),
      shift({
        padding: COLLISION_OFFSET,
      }),
      size({
        apply({ rects, availableWidth, availableHeight, elements }) {
          onFloatingResize(rects.floating)
        },
      }),
      arrow({
        element: arrowRef,
        padding: COLLISION_OFFSET,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  const { arrow: { x: arrowX, y: arrowY } = {} } = middlewareData

  // console.log({ middlewareData })

  // set up unmounting/mounting transition
  const { isMounted, status } = useTransitionStatus(context, {
    duration: 1000,
  })

  // console.log({ status })
  // set up interactions
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  // const hover = useHover(context, {
  //   mouseOnly: true,
  //   handleClose: safePolygon(),
  //   // restMs: 150,
  //   delay: {
  //     open: 0,
  //     close: 200,
  //   },
  // })
  // console.log({ hover })
  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    // hover,
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
    width: ARROW_WIDTH,
    height: ARROW_HEIGHT,
    [staticSide]: `-${ARROW_HEIGHT}px`,
  }

  const getArrowPath = useCallback(
    (arrowOffsetX = 0, tipOffset) => {
      const bottomOffsetY = 20
      const tipOffsetX = tipOffset?.x ?? 0
      const tipOffsetY = tipOffset?.y ?? 0
      const arrowBottomLeft = {
        x: SVG_PADDING + arrowOffsetX - 20,
        y: SVG_PADDING + bottomOffsetY,
      }
      const arrowBottomRight = {
        x: SVG_PADDING + arrowOffsetX + ARROW_WIDTH + 20,
        y: SVG_PADDING + bottomOffsetY,
      }
      const arrowTop = {
        x: SVG_PADDING + arrowOffsetX + ARROW_WIDTH / 2 - tipOffsetX,
        y: SVG_PADDING - ARROW_HEIGHT - tipOffsetY,
      }
      // prettier-ignore
      return `
      M ${arrowBottomRight.x},${arrowBottomRight.y}
      C ${arrowBottomRight.x - 20},${arrowBottomRight.y} ${arrowTop.x},${arrowTop.y + ARROW_HEIGHT} ${arrowTop.x},${arrowTop.y}
      C ${arrowTop.x},${arrowTop.y + ARROW_HEIGHT} ${arrowBottomLeft.x + 20},${arrowBottomLeft.y} ${arrowBottomLeft.x},${arrowBottomLeft.y}
        Z
      `
    },
    [ARROW_WIDTH, ARROW_HEIGHT, SVG_PADDING]
  )

  const hasNotification = amount >= 1

  const refereceProps = getReferenceProps({
    ref: reference,
    style,
    className,
  })

  // console.log({ refereceProps })

  return (
    <>
      <NotificationWrap {...refereceProps}>
        <ScaleInAnimation isHidden={amount < 1}>
          <CircleButton>{amount}</CircleButton>
        </ScaleInAnimation>
      </NotificationWrap>
      <FloatingPortal>
        {isMounted && (
          <FloatingFocusManager context={context} modal={false}>
            <Floating
              {...getFloatingProps({
                ref: floating,
                style: {
                  position: strategy,
                  zIndex: 1000,
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
                isHidden={status !== 'open' || !hasNotification}
                style={{
                  transformOrigin: 'var(--annoucement-transform-origin)',
                }}
              >
                <PullRelease getArrowPath={getArrowPath} arrowX={arrowX}>
                  {({ pulledArrowPath, pullProps }) => (
                    <>
                      {bubbleProps && (
                        <BubbleSvg
                          {...bubbleProps}
                          pulledArrowPath={pulledArrowPath}
                          pullProps={pullProps}
                        />
                      )}
                      <Arrow ref={arrowRef} style={arrowStyle} />
                      <Content COLLISION_OFFSET={COLLISION_OFFSET}>
                        <Actions
                          onPreviousClick={onPreviousClick}
                          onNextClick={onNextClick}
                          label={formatIsoDate(annoucement.date)}
                          amount={amount}
                        />
                        <ContentTitle>{annoucement.title}</ContentTitle>
                        <PortableText value={annoucement.content} />
                      </Content>
                    </>
                  )}
                </PullRelease>
              </ScaleInAnimation>
            </Floating>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
}
