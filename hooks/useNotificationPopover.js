import {
  arrow,
  autoUpdate,
  offset,
  safePolygon,
  shift,
  size,
  hide,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStatus,
  autoPlacement,
  flip,
} from '@floating-ui/react'
import { useIsomorphicLayoutEffect } from '@react-spring/web'
import { useCallback, useState, useRef } from 'react'

const sides = {
  top: {
    returnTransformOrigin: ({ size, x }) =>
      `${x + size.width / 2}px calc(100% + ${size.length}px)`,
    returnArrowStyle: ({ overlap = 0, size, x }) => ({
      bottom: overlap - size.length,
      left: x,
      // transform: 'rotate(180deg)',
      width: size.width,
      height: size.length,
    }),
  },
  right: {
    returnTransformOrigin: ({ size, y }) =>
      `-${size.length}px ${y + size.width / 2}px`,
    returnArrowStyle: ({ overlap = 0, size, y }) => ({
      left: overlap - size.length,
      top: y,
      // transform: 'rotate(-90deg)',
      width: size.length,
      height: size.width,
    }),
  },
  bottom: {
    returnTransformOrigin: ({ size, x }) =>
      `${x + size.width / 2}px -${size.length}px`,
    returnArrowStyle: ({ overlap = 0, size, x }) => ({
      top: overlap - size.length,
      left: x,
      // transform: 'rotate(0deg)',
      width: size.width,
      height: size.length,
    }),
  },
  left: {
    returnTransformOrigin: ({ size, y }) =>
      `calc(100% + ${size.length}px) ${y + size.width / 2}px`,
    returnArrowStyle: ({ overlap = 0, size, y }) => ({
      right: overlap - size.length,
      top: y,
      // transform: 'rotate(90deg)',
      width: size.length,
      height: size.width,
    }),
  },
}

export const useNotificationPopover = ({
  transitionDelay = 400,
  arrowOverlap = 1,
  arrowDistance = 0,
  collisionPadding = 0,
  onResize,
  arrowSize = {
    length: 200,
    width: 10,
  },
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const arrowRef = useRef(null)

  const handleResize = useCallback(
    (args) => {
      if (typeof onResize !== 'function') return
      onResize(args)
    },
    [onResize]
  )

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

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
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: arrowSize.length + arrowDistance,
      }),
      // autoPlacement({
      //   alignment: 'start',
      //   autoAlignment: false,
      // }),
      flip({
        padding: collisionPadding,
      }),
      shift({
        padding: collisionPadding,
      }),
      size({
        apply({ rects, availableWidth, availableHeight, elements }) {
          handleResize({ rects, availableWidth, availableHeight, elements })
        },
      }),
      arrow({
        element: arrowRef,
        padding: 40,
      }),
      // hide(),
    ],
  })

  const { arrow: arrowData = {}, hide: hideData = {} } = middlewareData
  const { x: arrowX, y: arrowY } = arrowData
  const { referenceHidden } = hideData

  // set up interactions
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const focus = useFocus(context)
  const hover = useHover(context, {
    mouseOnly: true,
    handleClose: safePolygon(),
    // enabled: false,
  })

  // get props getters for all interactions
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
    focus,
    hover,
  ])

  // setup transition status for unmounting animations
  const { isMounted, status } = useTransitionStatus(context, {
    duration: transitionDelay,
  })

  const currentSide = floatingPlacement.split('-')[0]

  const side = sides[currentSide] || sides.top

  const arrowStyle = side.returnArrowStyle({
    x: arrowX,
    y: arrowY,
    size: arrowSize,
    overlap: arrowOverlap,
  })

  const transformOrigin = side.returnTransformOrigin({
    x: arrowX,
    y: arrowY,
    size: arrowSize,
  })

  // composing props
  const referenceProps = getReferenceProps({
    ref: reference,
  })

  const focusManagerProps = {
    modal: false,
    context,
  }

  const floatingProps = getFloatingProps({
    ref: floating,
    style: {
      position: strategy,
      width: 'max-content',
      zIndex: 1000,
      top: 0,
      left: 0,
      transform: `translate(${Math.round(x ?? 0)}px,${Math.round(y ?? 0)}px)`,
    },
  })

  const arrowProps = {
    ref: arrowRef,
    style: {
      position: 'absolute',
      ...arrowStyle,
    },
  }

  useIsomorphicLayoutEffect(() => {
    if (referenceHidden && isOpen) {
      setIsOpen(false)
    }
  }, [referenceHidden, isOpen])

  return {
    close,
    isOpen,
    isMounted,
    referenceProps,
    focusManagerProps,
    floatingProps,
    arrowProps,
    transformOrigin,
    currentSide,
    arrowX,
    arrowY,
    arrowSize,
  }
}
