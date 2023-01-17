import {
  arrow,
  autoPlacement,
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
} from '@floating-ui/react'
import { useCallback, useState, useRef } from 'react'

const arrowOverflow = 1

const transformOriginGetters = {
  bottom: ({ size, x }) => `${x + size / 2}px -${size}px`,
  left: ({ size, y }) => `calc(100% + ${size}px) ${y + size / 2}px`,
  top: ({ size, x }) => `${x + size / 2}px calc(100% + ${size}px)`,
  right: ({ size, y }) => `-${size}px ${y + size / 2}px`,
}

const arrowStyleGetters = {
  bottom: ({ size, x }) => ({
    top: arrowOverflow - size,
    left: x,
    transform: 'rotate(0deg)',
  }),
  left: ({ size, y }) => ({
    right: arrowOverflow - size,
    top: y,
    transform: 'rotate(90deg)',
  }),
  top: ({ size, x }) => ({
    bottom: arrowOverflow - size,
    left: x,
    transform: 'rotate(180deg)',
  }),
  right: ({ size, y }) => ({
    left: arrowOverflow - size,
    top: y,
    transform: 'rotate(-90deg)',
  }),
}

export const useNotificationPopover = ({
  arrowSize = 60,
  transitionDelay = 400,
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
      autoPlacement({
        padding: 0,
      }),
      shift({
        padding: 10,
      }),
      size({
        apply({ rects, availableWidth, availableHeight, elements }) {
          handleResize({ rects, availableHeight, availableWidth, elements })
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
  const focus = useFocus(context, {
    enabled: true,
  })
  const hover = useHover(context, {
    mouseOnly: true,
    handleClose: safePolygon(),
    delay: { open: 0, close: 80 },
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
      top: 0,
      left: 0,
      transform: `translate(${Math.round(x ?? 0)}px,${Math.round(y ?? 0)}px)`,
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
