import { useIsomorphicLayoutEffect, useSpring } from '@react-spring/web'
import { useEffect } from 'react'

export const usePopoverAnimation = (isOpen) => {
  const [props, api] = useSpring(
    () => ({
      from: {
        opacity: 0,
        scale: 0.4,
      },
      config: {
        tension: 200,
        friction: 14,
        precision: 0.001,
      },
    }),
    []
  )

  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      api.start({
        opacity: 1,
        scale: 1,
        config: {
          clamp: false,
        },
      })
      return
    }
    api.start({
      opacity: 0,
      scale: 0.4,
      config: {
        clamp: true,
      },
    })
  }, [isOpen, api])
  return props
}
