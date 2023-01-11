import {
  animated,
  useIsomorphicLayoutEffect,
  useSpringValue,
} from '@react-spring/web'
import { useDrag, useHover } from '@use-gesture/react'
import styled from 'styled-components'
import { springConfig } from './bubbleHelpers'

const Wrap = styled(animated.div)`
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1);
`

export const ScaleInAnimation = ({ children, style, isHidden = false }) => {
  // const bind = useHover()
  const value = useSpringValue(0, {
    config: springConfig,
  })

  useIsomorphicLayoutEffect(() => {
    const newValue = isHidden ? 0 : 1
    const config = isHidden ? { clamp: true } : { clamp: false }
    value.start(newValue, { config })
  }, [isHidden])
  return <Wrap style={{ ...style, scale: value }}>{children}</Wrap>
}
