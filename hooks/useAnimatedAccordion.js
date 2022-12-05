import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

const useAnimatedAccordion = ({ returnScrollTargetId, classes = {} }) => {
  const rootRef = useRef(null)
  const flipState = useRef(null)
  const ctx = useRef(null)
  useEffect(() => {
    let q = gsap.utils.selector(rootRef)
    ctx.current = gsap.context((self) => {
      console.log('is setting up')
      self.add('q', (selector) => {
        console.log('q', selector)
        return q(selector)
      })
      self.add('snapFlipState', () => {
        console.log('snapFlipState')
        const allClasses = Object.values(classes)
          .map((c) => `.${c}`)
          .join(', ')
        console.log({ allClasses })
        flipState.current = Flip.getState(q(allClasses))
      })
      self.add('doAFlip', () => {
        console.log('doAFlip')
        const state = flipState.current
        if (!state) return
        // Flip.from(state, {
        //   overwrite: 'all',
        //   duration: 0.3,
        //   ease: 'power1.inOut',
        //   targets: [classes.entry].map((c) => `.${c}`).join(', '),
        //   simple: true,
        //   nested: true,
        //   onEnter: (elements) =>
        //     gsap.fromTo(
        //       elements,
        //       { opacity: 0, scale: 0 },
        //       { opacity: 1, scale: 1, duration: 0.3 }
        //     ),
        //   onLeave: (elements) =>
        //     gsap.to(elements, { opacity: 0, scale: 0, duration: 0.3 }),
        // })
        Flip.from(state, {
          overwrite: 'all',
          duration: 0.3,
          ease: 'power1.inOut',
          targets: [classes.entries, classes.entryChild]
            .map((c) => `.${c}`)
            .join(', '),
          simple: true,
          nested: true,
          // onEnter: (elements) =>
          //   gsap.fromTo(
          //     elements,
          //     { opacity: 0, scale: 0 },
          //     { opacity: 1, scale: 1, duration: 0.3 }
          //   ),
          // onLeave: (elements) =>
          //   gsap.to(elements, { opacity: 0, scale: 0, duration: 0.3 }),
        })
      })
      self.add('scrollToEntry', (key, offsetY = 0) => {
        if (!key || typeof returnScrollTargetId !== 'function') return
        const id = `#${returnScrollTargetId(key)}`
        console.log('scrollToEntry', id)
        gsap.to(window, {
          overwrite: 'all',
          ease: 'power1.inOut',
          duration: 0.3,
          scrollTo: {
            y: id,
            autoKill: true,
            offsetY,
          },
        })
      })
      return () => {
        console.log('is reverting')
      }
    }, rootRef)
    return () => {
      ctx.current.revert()
      // q = null
    }
  }, [classes, returnScrollTargetId])

  const [value, setValue] = useState('')
  const lastValue = useRef(value)
  const onValueChange = useCallback((val) => {
    console.log('onValueChange', val)
    ctx.current.snapFlipState()
    setValue((prev) => {
      if (prev === val) return ''
      return val
    })
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (!ctx.current) return
    ctx.current.doAFlip()
    const lastVal = lastValue.current
    if (value === '') {
      ctx.current.scrollToEntry(lastVal, 100)
    }
    if (value) {
      ctx.current.scrollToEntry(value, 0)
    }
    lastValue.current = value
  }, [value])

  return {
    rootRef,
    value,
    onValueChange,
  }
}

export default useAnimatedAccordion
