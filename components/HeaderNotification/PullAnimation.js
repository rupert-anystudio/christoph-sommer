import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { is } from 'date-fns/locale'
import _clamp from 'lodash/clamp'
import { useEffect } from 'react'

const bounds = {
  top: -200,
  right: 200,
  bottom: 200,
  left: -200,
}

export const usePullAnimation = ({ isOpen, currentSide }) => {
  const [style, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: {
      tension: 90,
      friction: 22,
      mass: 2,
      precision: 0.001,
    },
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

  useEffect(() => {
    if (!isOpen) return
    if (currentSide === 'top') {
      api.set({
        x: -80,
        y: -200,
      })
    }
    if (currentSide === 'bottom') {
      api.set({
        x: 80,
        y: 200,
      })
    }
    // if (currentSide === 'left') {
    //   api.set({
    //     x: 400,
    //     y: 0,
    //   })
    // }
    // if (currentSide === 'right') {
    //   api.set({
    //     x: -400,
    //     y: 0,
    //   })
    // }
    api.start({
      x: 0,
      y: 0,
    })
  }, [isOpen, currentSide, api])

  return [style, bind()]
}

export const PullAnimation = ({ children }) => {
  const [style, props] = usePullAnimation()
  return (
    <div {...props}>
      <animated.div style={style}>{children}</animated.div>
    </div>
  )
}
