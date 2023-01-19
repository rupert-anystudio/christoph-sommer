import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react'
import { useNotificationPopover } from '../../hooks/useNotificationPopover'

export const Notification = ({
  children = () => null,
  renderContent = () => null,
  arrowSize = 40,
  transitionDelay = 0,
  onResize = () => null,
}) => {
  const {
    isOpen,
    isMounted,
    close,
    referenceProps,
    focusManagerProps,
    floatingProps,
    arrowProps,
    transformOrigin,
  } = useNotificationPopover({
    arrowSize,
    transitionDelay,
    onResize,
  })
  return (
    <>
      {children(referenceProps)}
      <FloatingPortal>
        {isMounted && (
          <FloatingFocusManager {...focusManagerProps}>
            {renderContent({
              floatingProps,
              arrowProps,
              transformOrigin,
              isOpen,
              close,
            })}
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    </>
  )
}
