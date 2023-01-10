import {
  animated,
  useIsomorphicLayoutEffect,
  useSpringValue,
} from '@react-spring/web'
import styled from 'styled-components'

const Wrap = styled(animated.div)`
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1);
`

export const ScaleInAnimation = ({ children, style, isHidden = false }) => {
  const value = useSpringValue(0, {
    config: {
      tension: 200,
      friction: 12,
      precision: 0.001,
    },
  })

  useIsomorphicLayoutEffect(() => {
    const newValue = isHidden ? 0 : 1
    const config = isHidden ? { clamp: true } : { clamp: false }
    value.start(newValue, { config })
  }, [isHidden])
  return <Wrap style={{ ...style, scale: value }}>{children}</Wrap>
}
