import { animated } from '@react-spring/web'
import { useBubblePullRelease } from './useBubblePullRelease'

export const PullRelease = ({ children, getArrowPath, arrowX }) => {
  const [{ x, y, pulledArrowPath }, pullProps] = useBubblePullRelease({
    arrowX,
    getArrowPath,
  })
  return (
    <animated.div style={{ x, y }}>
      {children({ pulledArrowPath, pullProps })}
    </animated.div>
  )
}
