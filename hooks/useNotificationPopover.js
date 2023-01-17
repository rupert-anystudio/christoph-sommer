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
      `${x + size / 2}px calc(100% + ${size}px)`,
    returnArrowStyle: ({ overlap = 0, size, x }) => ({
      bottom: overlap - size,
      left: x,
      transform: 'rotate(180deg)',
    }),
  },
  right: {
    returnTransformOrigin: ({ size, y }) => `-${size}px ${y + size / 2}px`,
    returnArrowStyle: ({ overlap = 0, size, y }) => ({
      left: overlap - size,
      top: y,
      transform: 'rotate(-90deg)',
    }),
  },
  bottom: {
    returnTransformOrigin: ({ size, x }) => `${x + size / 2}px -${size}px`,
    returnArrowStyle: ({ overlap = 0, size, x }) => ({
      top: overlap - size,
      left: x,
      transform: 'rotate(0deg)',
    }),
  },
  left: {
    returnTransformOrigin: ({ size, y }) =>
      `calc(100% + ${size}px) ${y + size / 2}px`,
    returnArrowStyle: ({ overlap = 0, size, y }) => ({
      right: overlap - size,
      top: y,
      transform: 'rotate(90deg)',
    }),
  },
}

export const useNotificationPopover = ({
  arrowSize = 60,
  transitionDelay = 400,
  arrowOverlap = 1,
  arrowDistance = 20,
  collisionPadding = 20,
  onResize,
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
    placement: 'top-center',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        mainAxis: arrowSize + arrowDistance,
      }),
      autoPlacement(),
      // flip(),
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
        padding: 0,
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
    enabled: false,
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

  const side = sides[currentSide]

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
      width: arrowSize,
      height: arrowSize,
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
