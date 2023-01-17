import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
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
    isMounted,
    referenceProps,
    focusManagerProps,
    floatingProps,
    arrowProps,
    transformOrigin,
  } = useNotificationPopover({
    arrowSize,
    transitionDelay,
  })
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
