import {
  animated,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web'
import { useHover } from '@use-gesture/react'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { springConfig } from './springConfig'

const Wrap = styled(animated.div)`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 0 0 auto;
`

const Content = styled.div`
  flex: 0;
  position: relative;
  width: 100%;
  height: auto;
`

export const ConstrainedAccordionItem = ({
  children,
  currentHeight,
  currentY,
  isSelected,
  itemKey,
  observer,
  setViewportY,
  isLast,
}) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const contentEl = contentRef.current
    if (!contentEl) return
    observer.observe(contentEl)
    return () => {
      observer.unobserve(contentEl)
    }
  }, [observer, contentRef])

  const [style, api] = useSpring(() => ({
    from: {
      opacity: 0,
    },
    config: springConfig,
  }))

  useIsomorphicLayoutEffect(() => {
    api.start({
      to: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      immediate: true,
    })
    api.start({
      to: {
        opacity: 1,
        height: currentHeight,
        y: currentY,
      },
    })
  }, [currentHeight, currentY, api])

  useEffect(() => {
    if (!isSelected) return
    setViewportY({
      y: currentY,
      immediate: true,
    })
  }, [currentY, isSelected, setViewportY])

  // useEffect(() => {
  //   if (!isSelected) return
  //   console.log('isSelected', isSelected)
  //   const contentEl = contentRef.current
  //   if (!contentEl) return
  //   contentEl.scrollIntoView()
  // }, [isSelected, api])

  // const bind = useHover((state = {}) => {
  //   const { hovering } = state
  //   console.log('useHover', state)
  //   api.start({
  //     to: {
  //       opacity: 1,
  //       height: hovering && !item.isSelected ? height + 60 : height,
  //     },
  //   })
  // })

  return (
    <Wrap
      style={{ ...style, borderBottom: !isLast ? '2px solid blue' : 'none' }}
    >
      <Content
        ref={contentRef}
        data-observed-group={'item'}
        data-observed-id={itemKey}
      >
        {children}
      </Content>
    </Wrap>
  )
}
