import { useIsomorphicLayoutEffect, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useRef } from 'react'
import { springConfig } from './bubbleHelpers'
import _clamp from 'lodash/clamp'

const basePull = {
  x: 0,
  y: 0,
}

const bounds = {
  top: -40,
  right: 300,
  bottom: 300,
  left: -80,
}

export const useBubblePullRelease = ({ arrowX, getArrowPath }) => {
  const [style, api] = useSpring(() => ({
    ...basePull,
    pulledArrowPath: getArrowPath(arrowX, basePull),
    config: springConfig,
  }))
  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    const pull = {
      x: _clamp(down ? mx : 0, bounds.left, bounds.right) + basePull.x,
      y: _clamp(down ? my : 0, bounds.top, bounds.bottom) + basePull.y,
    }
    api.start({
      ...pull,
      pulledArrowPath: getArrowPath(arrowX, pull),
      immediate: down,
    })
  })

  const prevGetArrowPath = useRef(getArrowPath)
  const prevArrowX = useRef(arrowX)

  useIsomorphicLayoutEffect(() => {
    if (
      arrowX === prevArrowX.current &&
      getArrowPath === prevGetArrowPath.current
    )
      return
    prevGetArrowPath.current = getArrowPath
    prevArrowX.current = arrowX
    const pull = {
      x: style.x.goal,
      y: style.y.goal,
    }
    api.start({
      ...pull,
      pulledArrowPath: getArrowPath(arrowX, pull),
      immediate: true,
    })
  }, [arrowX, api, style, getArrowPath])

  const props = bind()

  return [style, props]
}
