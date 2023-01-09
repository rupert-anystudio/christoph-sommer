import { animated, useSpring } from '@react-spring/web'

export const ScaleInAnimation = ({ children }) => {
  const style = useSpring({
    from: {
      scale: 0.1,
    },
    to: {
      scale: 1,
    },
  })
  return <animated.div style={style}>{children}</animated.div>
}
