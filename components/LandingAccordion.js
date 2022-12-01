import { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import Scroll from './Scroll'
import usePagePropsContext from '../hooks/usePagePropsContext'
import PortableText from './PortableText'
import { Small } from './Primitives'

const Content = styled.div`
  position: relative;
`
const Item = styled.div`
  position: relative;
  border-bottom: var(--border);
`
const ItemHeader = styled.div`
  position: relative;
  padding: var(--padding-page);
  background-color: var(--color-bg);
`
const ItemContent = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 var(--padding-page) var(--padding-page) var(--padding-page);
`
const Sticky = styled.div`
  position: relative;
  position: sticky;
  top: 0;
  z-index: 1;
`

const useGsapAccordion = () => {
  const rootRef = useRef()
  const viewportRef = useRef()

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
    viewportRef,
    value: layout.value,
    onValueChange,
  }
}

const useAboutAccordionItems = () => {
  const { about } = usePagePropsContext()
  const items = useMemo(() => {
    return [
      {
        key: 'missionStatement',
        label: 'Mission',
        content: about?.missionStatement,
      },
      {
        key: 'aboutText',
        label: 'Über Mich',
        content: about?.aboutText,
      },
      {
        key: 'nochMehr',
        label: 'Nochmehr',
        content: about?.aboutText,
      },
    ]
  }, [about])
  return items
}

const LandingAccordion = () => {
  const items = useAboutAccordionItems()
  const { value, rootRef, viewportRef, onValueChange } = useGsapAccordion()

  const onItemClick = useCallback(
    (key) => (e) => {
      e.preventDefault()
      onValueChange(key)
    },
    [onValueChange]
  )

  return (
    <Scroll rootRef={rootRef} viewportRef={viewportRef}>
      <Content className="accordion-items">
        {items.map((item) => {
          const { key, label, content } = item
          const isOpen = key === value
          return (
            <Item
              key={key}
              onClick={onItemClick(key)}
              className={`accordion-item-${key}`}
            >
              {/* <Sticky> */}
              <ItemHeader
                data-flip-id={`header-${key}`}
                className="accordion-item-header"
              >
                <Small>{label}</Small>
              </ItemHeader>
              {/* </Sticky> */}
              <ItemContent
                data-flip-id={`content-${key}`}
                className="accordion-item-content"
                style={{ maxHeight: isOpen ? 'none' : 96 }}
              >
                <PortableText value={content} />
              </ItemContent>
            </Item>
          )
        })}
      </Content>
    </Scroll>
  )
}

export default LandingAccordion
