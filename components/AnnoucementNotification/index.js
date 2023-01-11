import {
  arrow,
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'
import { useSpring, animated } from '@react-spring/web'
import { useCallback, useEffect, useRef } from 'react'
import { forwardRef, useState } from 'react'
import styled from 'styled-components'
import usePagePropsContext from '../../hooks/usePagePropsContext'
import {
  returnAngleFromVector,
  returnCappedLength,
  returnDistanceBetweenPoints,
  returnPointBetweenPoints,
  returnSegmentsFromLength,
  returnVectorFromPoints,
  springConfig,
} from '../Annoucements/bubbleHelpers'
import { ScaleInAnimation } from '../Annoucements/ScaleInAnimation'
import { Title } from '../Primitives'
import _clamp from 'lodash/clamp'
import useObservedElement from '../useObservedElement'

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

const NotificationWrap = styled.div`
  position: absolute;
  display: block;
  pointer-events: auto;
  cursor: pointer;
`
const NotificationShape = styled.div`
  position: relative;
  display: block;
  transform: translate3d(0, 0, 0);
  aspect-ratio: 1;
  min-width: 40px;
  background-color: var(--color-txt);
  text-align: center;
  border-radius: 50%;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`
const NotificationLabel = styled.span`
  color: var(--color-bg);
  font-size: 14px;
`
const Floating = styled.div`
  position: relative;
  display: block;
  width: auto;
`
const FloatingStage = styled.div`
  position: relative;
  display: block;
  width: clamp(80px, 90vw, 500px);
`
const Arrow = styled.div`
  outline: 1px dashed teal;
`
const Content = styled.div`
  position: relative;
  display: block;
  width: 100%;
  padding: var(--padding-page);
  text-align: center;
  outline: 1px dashed teal;
`

const Svg = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})`
  position: absolute;
  display: block;
  pointer-events: none;
  outline: 1px dashed teal;
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
`

const BaseShape = styled.rect`
  fill: none;
  stroke: red;
  stroke-width: 1;
`

const Notification = forwardRef(({ children, ...props }, ref) => (
  <NotificationWrap {...props} ref={ref}>
    <ScaleInAnimation>
      <NotificationShape>
        <NotificationLabel>{children}</NotificationLabel>
      </NotificationShape>
    </ScaleInAnimation>
  </NotificationWrap>
))
Notification.displayName = 'Notification'

const arrowSides = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

const useFloatingBubble = ({
  arrowHeight,
  arrowWidth,
  arrowOffset,
  arrowPadding,
  onResize,
}) => {
  const arrowRef = useRef()

  const [open, setOpen] = useState(false)

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement: floatingPlacement,
    middlewareData: { arrow: { x: arrowX = 0, y: arrowY = 0 } = {} },
  } = useFloating({
    strategy: 'fixed',
    placement: 'top-start',
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({
        mainAxis: arrowHeight + arrowOffset,
        crossAxis: 0,
      }),
      shift({
        padding: 20,
      }),
      flip(),
      size({
        apply({ rects, availableWidth, availableHeight, elements }) {
          onResize({ rects, availableWidth, availableHeight, elements })
        },
      }),
      arrow({
        element: arrowRef,
        padding: arrowPadding,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })
  const arrowSide = arrowSides[floatingPlacement.split('-')[0]]
  // set up interactions
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const hover = useHover(context, {
    mouseOnly: true,
    handleClose: safePolygon(),
    // delay: {
    //   open: 10,
    //   close: 600,
    // },
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ])

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 200,
  })

  const isEntered = isMounted && status === 'open'

  const transformOrigin = `${
    arrowX != null ? `${arrowX + arrowWidth / 2}px` : 'center'
  } -${arrowHeight}px`

  const notificationProps = getReferenceProps({
    ref: reference,
    style: {
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
    },
  })
  const floatingProps = getFloatingProps({
    ref: floating,
    style: {
      position: strategy,
      zIndex: 1000,
      top: y ?? 0,
      left: x ?? 0,
      width: 'max-content',
      '--notification-transform-origin': transformOrigin,
    },
  })

  const focusManagerProps = {
    context,
    modal: false,
  }

  const arrowProps = {
    ref: arrowRef,
    style: {
      position: 'absolute',
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      width: arrowWidth,
      height: arrowHeight,
      [arrowSide]: `-${arrowHeight}px`,
    },
  }

  const transitionProps = {
    style: {
      transformOrigin: `var(--notification-transform-origin)`,
      // outline: '10px solid red',
    },
  }

  const arrowTip = {
    x: SVG_PADDING + (arrowX ?? 0) + (arrowWidth ?? 0) / 2,
    y: SVG_PADDING - (arrowHeight ?? 0),
  }

  return {
    arrowTip,
    context,
    transitionProps,
    isMounted,
    notificationProps,
    floatingProps,
    focusManagerProps,
    arrowProps,
    transformOrigin,
    isEntered,
  }
}

const FloatingTransition = ({ children, style, isEntered }) => {
  const [styles, api] = useSpring(() => ({
    scale: 0,
    config: springConfig,
  }))

  useEffect(() => {
    api.start({
      scale: isEntered ? 1 : 0,
    })
  }, [isEntered, api])

  return (
    <animated.div
      style={{
        ...style,
        transform: styles.scale.to((value) => `scale(${_clamp(value, 0, 5)})`),
      }}
    >
      {children}
    </animated.div>
  )
}

const BubbleShape = ({ points = [], arrowTip }) => {
  if (!points) return null

  const path = points
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
      if (i === points.length - 1) return `${arc} Z`
      return arc
    })
    .filter(Boolean)
    .join(' ')
  const closePoints = points
    .map((p) => ({
      ...p,
      distanceTip: returnDistanceBetweenPoints(p.end, arrowTip),
    }))
    .sort((a, b) => a.distanceTip - b.distanceTip)
    .slice(0, 3)
    .sort((a, b) => a.index - b.index)

  const arrowPoints = [
    closePoints[0],
    {
      end: arrowTip,
    },
    closePoints[closePoints.length - 1],
  ].filter(Boolean)

  console.log({ arrowPoints, points })

  return (
    <>
      {['outside', 'inside'].map((group) => (
        <g className={group} key={group}>
          <path d={path} />
        </g>
      ))}
      {arrowPoints.map((p, i) => (
        <circle key={i} cx={p.end.x} cy={p.end.y} r={10} />
      ))}
    </>
  )
}

const SEGMENT_MINLENGTH = 100
const SEGMENT_AMOUNT = 18
const POINT_DEVIATION_RANGE = 45
const SVG_PADDING = 100
const BASESHAPE_RADIUS = 30
const BASESHAPE_INSET = 0
// const START_OFFSET = 70

const SvgBubble = ({ bubbleProps, arrowTip }) => {
  const [bubblePoints, setBubblePoints] = useState([])

  const onBubbleBaseResize = useCallback((dimensions, baseShapeElement) => {
    // const layoutCount = layoutCountStore.current
    // layoutCountStore.current = layoutCount + 1
    const totalLength = baseShapeElement.getTotalLength()

    // const startOffset = Math.random() * START_OFFSET - START_OFFSET * 2
    // const startOffset = layoutCount * START_OFFSET

    const segments = returnSegmentsFromLength(
      totalLength,
      SEGMENT_MINLENGTH,
      SEGMENT_AMOUNT
    )

    const segmentPoints = segments.map((segmentLength, index) => {
      const baseLength = segmentLength * (index + 1)
      // const deviation = sideDeviation(index)
      const deviation =
        Math.random() * POINT_DEVIATION_RANGE - POINT_DEVIATION_RANGE * 2
      const pointLength = baseLength + deviation
      const pointLengthCapped = returnCappedLength(pointLength, totalLength)
      return baseShapeElement.getPointAtLength(pointLengthCapped)
    })

    const newBubblePoints = segmentPoints.map((end, index) => {
      const start =
        index === 0
          ? segmentPoints[segmentPoints.length - 1]
          : segmentPoints[index - 1]
      const mid = returnPointBetweenPoints(start, end)
      const normal = returnVectorFromPoints(start, end)
      const distance = returnDistanceBetweenPoints(start, end)
      return {
        key: index,
        index,
        start,
        mid,
        end,
        normal,
        distance,
      }
    })

    setBubblePoints(newBubblePoints)
  }, [])

  const [baseRef] = useObservedElement(onBubbleBaseResize)

  return (
    <Svg {...bubbleProps.svg}>
      <BaseShape ref={baseRef} {...bubbleProps.baseShape} />
      {bubblePoints && (
        <>
          <BubbleShape points={bubblePoints} arrowTip={arrowTip} />
          {/* <g>
            <circle cx={arrowTip.x} cy={arrowTip.y} r={10} />
            <text x={arrowTip.x} y={arrowTip.y}>
              Tip
            </text>
            {bubblePoints.map((p) => {
              const { key, isClose, isClosest, point, distancePointArrow } = p
              return (
                <g
                  key={key}
                  fill={isClosest ? 'red' : isClose ? 'orange' : 'black'}
                >
                  <circle cx={point.x} cy={point.y} r={8} />
                  <text x={point.x} y={point.y}>
                    {Math.round(distancePointArrow)}
                  </text>
                </g>
              )
            })}
          </g> */}
        </>
      )}
    </Svg>
  )
}

const useAnnoucement = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { annoucements = [] } = usePagePropsContext()
  const amount = annoucements.length
  const annoucement = annoucements[currentIndex] || null

  const onNextClick = () => {
    setCurrentIndex((i) => {
      const nextIndex = i + 1
      if (nextIndex + 1 > amount) return 0
      return nextIndex
    })
  }

  return {
    annoucement,
    notificationLabel: currentIndex + 1,
    popoverLabel: annoucement?.title,
    onNextClick,
  }
}

const useBubbleProps = () => {
  const [bubbleProps, setBubbleProps] = useState(null)

  const onFloatingRectResize = useCallback((rect) => {
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
    const baseShape = {
      width: rect.width - BASESHAPE_INSET * 2,
      height: rect.height - BASESHAPE_INSET * 2,
      x: SVG_PADDING + BASESHAPE_INSET,
      y: SVG_PADDING + BASESHAPE_INSET,
      rx: BASESHAPE_RADIUS,
      ry: BASESHAPE_RADIUS,
    }
    const newBubbleProps = {
      svg,
      baseShape,
    }
    setBubbleProps(newBubbleProps)
  }, [])

  const onResize = ({ rects }) => {
    onFloatingRectResize(rects.floating)
  }

  return {
    bubbleProps,
    onResize,
  }
}

export const AnnoucementNotification = () => {
  // prettier-ignore
  const {
    annoucement,
    notificationLabel,
    popoverLabel,
    onNextClick,
  } = useAnnoucement()

  const { bubbleProps, onResize } = useBubbleProps()

  // prettier-ignore
  const {
    isMounted,
    isEntered,
    notificationProps,
    floatingProps,
    focusManagerProps,
    transitionProps,
    arrowProps,
    arrowTip,
  } = useFloatingBubble({
    arrowHeight: 60,
    arrowWidth: 70,
    arrowOffset: 20,
    arrowPadding: 80,
    onResize,
  })

  if (!annoucement) return null

  return (
    <>
      <Notification {...notificationProps}>{notificationLabel}</Notification>
      <FloatingPortal>
        {isMounted && (
          <FloatingFocusManager {...focusManagerProps}>
            <Floating {...floatingProps}>
              <FloatingTransition isEntered={isEntered} {...transitionProps}>
                <FloatingStage>
                  {bubbleProps && arrowTip && (
                    <SvgBubble bubbleProps={bubbleProps} arrowTip={arrowTip} />
                  )}
                  <Arrow {...arrowProps} />
                  <Content>
                    <Title as="h1">{popoverLabel}</Title>
                    <button onClick={onNextClick}>{'next'}</button>
                  </Content>
                </FloatingStage>
              </FloatingTransition>
            </Floating>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
}

export default AnnoucementNotification
