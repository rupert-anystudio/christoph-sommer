import { animated, useSpring } from '@react-spring/web'
import { useEffect } from 'react'

export const PopoverAnimation = ({ isOpen, style, children }) => {
  const [props, api] = useSpring(
    () => ({
      from: { scale: 0.8, opacity: 0 },
      to: { scale: 1, opacity: 1 },
      config: {
        tension: 220,
        friction: 14,
        precision: 0.001,
      },
    }),
    []
  )

  useEffect(() => {
    api.start({
      scale: isOpen ? 1 : 0,
      opacity: isOpen ? 1 : 0,
    })
  }, [isOpen, api])

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

export const ShiftAnimation = ({ style, children, x, y }) => {
  const [props, api] = useSpring(
    () => ({
      from: { x: 0, y: 0 },
      to: { x, y },
      config: {
        tension: 220,
        friction: 14,
        precision: 0.001,
      },
    }),
    [x, y]
  )

  useEffect(() => {
    api.start({
      x,
      y,
    })
  }, [x, y, api])

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
