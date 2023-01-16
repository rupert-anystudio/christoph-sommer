import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { useEffect } from 'react'
import { useNotificationPopover } from './useNotificationPopover'

export const Notification = ({
  referenceComponent: Reference,
  children,
  label = 1,
  arrowSize,
  transitionDelay,
}) => {
  const {
    isOpen,
    context,
    isMounted,
    referenceProps,
    focusManagerProps,
    floatingProps,
    arrowProps,
    transformOrigin,
    status,
  } = useNotificationPopover({
    arrowSize,
    transitionDelay,
  })
  useEffect(() => {
    console.log({ status })
  }, [status])
  useEffect(() => {
    console.log({ context })
  }, [context])
  return (
    <>
      <Reference {...referenceProps}>{label}</Reference>
      <FloatingPortal>
        {isMounted && (
          <FloatingFocusManager {...focusManagerProps}>
            {children({
              floatingProps,
              arrowProps,
              transformOrigin,
              isOpen,
            })}
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
}
