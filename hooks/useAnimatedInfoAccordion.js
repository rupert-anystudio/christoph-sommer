import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import usePagePropsContext from './usePagePropsContext'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function returnBlocks(about) {
  return [
    {
      value: 'missionStatement',
      label: 'Mission',
      content: about?.missionStatement,
    },
    {
      value: 'aboutText',
      label: 'Über Mich',
      content: about?.aboutText,
    },
    {
      value: 'nochMehr',
      label: 'Nochmehr',
      content: about?.aboutText,
    },
  ]
}

const targets = '.accordion-item, .accordion-item-content'

const useAnimatedInfoAccordion = () => {
  const rootRef = useRef()
  const blockRefs = useRef({})
  const q = useMemo(() => gsap.utils.selector(rootRef), [])
  const { about } = usePagePropsContext()
  const blocks = returnBlocks(about)

  const [layout, setLayout] = useState({
    value: blocks[0].value,
  })

  useIsomorphicLayoutEffect(() => {
    if (!layout.state) return
    const tl = Flip.from(layout.state, {
      // absolute: true,
      ease: 'power1.inOut',
      targets: q(targets),
      // scale: true,
      simple: true,
      nested: true,
    })
    return () => {
      tl.kill()
    }
  }, [layout, q])

  useEffect(() => {
    const el = blockRefs.current[layout.value]
    if (!el) return
    el.scrollIntoView({
      behaviour: 'smooth',
      block: 'start',
      inline: 'start',
    })
  }, [layout, q])

  const onValueChange = useCallback(
    (value) => {
      const state = Flip.getState(q(targets))
      setLayout({
        state,
        value,
      })
    },
    [q]
  )

  const setBlockRef = useCallback(
    (id) => (c) => {
      blockRefs.current[id] = c
    },
    []
  )

  return {
    blocks,
    setBlockRef,
    rootProps: {
      type: 'single',
      collapsible: false,
      onValueChange,
      value: layout.value,
      ref: rootRef,
    },
  }
}

export default useAnimatedInfoAccordion
