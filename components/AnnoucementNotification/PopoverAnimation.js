import { animated } from '@react-spring/web'
import { usePopoverAnimation } from '../../hooks/usePopoverAnimation'

export const PopoverAnimation = ({ children, style, isOpen }) => {
  const props = usePopoverAnimation(isOpen)
  return (
    <animated.div
      style={{
        ...style,
        ...props,
      }}
    >
      {children}
    </animated.div>
  )
}
