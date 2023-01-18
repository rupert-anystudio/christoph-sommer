import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import _clamp from 'lodash/clamp'

const bounds = {
  top: -200,
  right: 200,
  bottom: 200,
  left: -200,
}

export const usePullAnimation = () => {
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }))
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    const pull = {
      x: _clamp(down ? mx : 0, bounds.left, bounds.right),
      y: _clamp(down ? my : 0, bounds.top, bounds.bottom),
    }
    api.start({
      ...pull,
      immediate: down,
    })
  })
  return [style, bind()]
}
