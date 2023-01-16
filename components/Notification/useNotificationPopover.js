import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  hide,
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
import { useState } from 'react'
import { useRef } from 'react'

const transformOriginGetters = {
  bottom: ({ size, x }) => `${x + size / 2}px -${size}px`,
  left: ({ size, y }) => `calc(100% + ${size}px) ${y + size / 2}px`,
  top: ({ size, x }) => `${x + size / 2}px calc(100% + ${size}px)`,
  right: ({ size, y }) => `-${size}px ${y + size / 2}px`,
}

const arrowStyleGetters = {
  bottom: ({ size, x }) => ({
    top: 0 - size,
    left: x,
    transform: 'rotate(0deg)',
  }),
  left: ({ size, y }) => ({
    right: 0 - size,
    top: y,
    transform: 'rotate(90deg)',
  }),
  top: ({ size, x }) => ({
    bottom: 0 - size,
    left: x,
    transform: 'rotate(180deg)',
  }),
  right: ({ size, y }) => ({
    left: 0 - size,
    top: y,
    transform: 'rotate(-90deg)',
  }),
}

export const useNotificationPopover = ({
  arrowSize = 60,
  transitionDelay = 400,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const arrowRef = useRef(null)

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
      hide(),
      offset({
        mainAxis: arrowSize + 10,
      }),
      // flip(),
      autoPlacement({
        padding: 0,
      }),
      shift({
        padding: 10,
      }),
      size({
        apply({ rects, availableWidth, availableHeight, elements }) {
          // onResize({ rects, availableWidth, availableHeight, elements })
        },
      }),
      arrow({
        element: arrowRef,
        padding: 0,
      }),
    ],
  })

  const { arrow: arrowData = {} } = middlewareData

  const { x: arrowX = 0, y: arrowY = 0 } = arrowData

  // set up interactions
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  const hover = useHover(context, {
    mouseOnly: true,
    handleClose: safePolygon(),
    delay: { open: 0, close: 2000 },
  })

  // get props getters for all interactions
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
    role,
  ])

  // setup transition status for unmounting animations
  const { isMounted, status } = useTransitionStatus(context, {
    duration: transitionDelay,
  })

  const floatingSide = floatingPlacement.split('-')[0]
  const arrowStyleGetter = arrowStyleGetters[floatingSide]
  const transformOriginGetter = transformOriginGetters[floatingSide]

  const arrowStyle = arrowStyleGetter({
    x: arrowX,
    y: arrowY,
    size: arrowSize,
  })

  const transformOrigin = transformOriginGetter({
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
      // top: 0,
      // left: 0,
      top: y ?? 0,
      left: x ?? 0,
      transformOrigin,
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

  return {
    context,
    isOpen,
    isMounted,
    status,
    referenceProps,
    focusManagerProps,
    floatingProps,
    arrowProps,
    transformOrigin,
  }
}
