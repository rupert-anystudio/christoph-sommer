import { useSpring } from '@react-spring/web'
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

  useEffect(() => {
    if (isOpen) {
      api.start({
        to: {
          opacity: 1,
          scale: 1,
        },
      })
      return
    }
    api.start({
      to: {
        opacity: 0,
        scale: 0.4,
      },
      config: {
        clamp: true,
      },
    })
  }, [isOpen, api])
  return props
}
