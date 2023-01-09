import { animated, useSpring } from '@react-spring/web'
import styled from 'styled-components'

const Wrap = styled(animated.div)`
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1);
`

export const ScaleInAnimation = ({ children, style }) => {
  const animatedStyle = useSpring({
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    config: {
      tension: 200,
      friction: 12,
      precision: 0.001,
    },
  })
  return (
    <animated.div style={{ ...style, ...animatedStyle }}>
      {children}
    </animated.div>
  )
}
