import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'

export const HoverAnimation = ({ children, isOpen }) => {
  const [style, api] = useSpring(() => ({
    scale: 1,
    config: {
      tension: 90,
      friction: 22,
      mass: 2,
      precision: 0.001,
    },
  }))
  useEffect(() => {
    api.start({
      scale: isOpen ? 1.1 : 1,
    })
  }, [api, isOpen])
  return <animated.div style={style}>{children}</animated.div>
}
