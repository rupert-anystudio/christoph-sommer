import { useCallback, useEffect, useRef, useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

const useGsapAccordion = () => {
  const rootRef = useRef()

  const [layout, setLayout] = useState({
    sate: null,
    value: '',
  })

  const [ctx] = useState(() =>
    gsap.context((self) => {
      const targets = '.accordion-item-header, .accordion-item-content'
      self.add('returnFlipState', () => {
        return Flip.getState(targets)
      })
      self.add('flipFromState', (state) => {
        if (!state) return
        Flip.from(state, {
          overwrite: 'all',
          targets,
          ease: 'power1.inOut',
          duration: 0.32,
          simple: true,
          nested: true,
          // scale: true,
        })
      })
      // self.add('scrollToItem', (key) => {
      //   const target =
      //     !key || key === '' ? '.accordion-items' : `.accordion-item-${key}`
      //   gsap.to(window, {
      //     duration: 1,
      //     scrollTo: {
      //       y: target,
      //       // autoKill: true
      //     },
      //   })
      // })
    }, rootRef)
  )

  useEffect(() => {
    return () => ctx.revert()
  }, [ctx])

  const onValueChange = useCallback(
    (key) => {
      setLayout((prev) => ({
        state: ctx.returnFlipState(),
        value: prev.value === key ? '' : key,
      }))
    },
    [ctx]
  )

  useIsomorphicLayoutEffect(() => {
    ctx.flipFromState(layout.state)
    return () => {
      ctx.revert()
      ctx.kill()
    }
  }, [ctx, layout])

  return {
    rootRef,
    value: layout.value,
    onValueChange,
  }
}

export default useGsapAccordion
