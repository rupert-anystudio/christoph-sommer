import {
  animated,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Wrap = styled(animated.div)`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 0 auto;
`

// style={{ flex: isSelected ? '1 0 auto' : '0 0 80px' }}

const Content = styled.div`
  flex: 0;
  position: relative;
  width: 100%;
  height: auto;
`

export const ConstrainedAccordionItem = ({ children, item, observer }) => {
  const wrapRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const wrapEl = wrapRef.current
    const contentEl = contentRef.current
    if (!wrapEl || !contentEl) return
    observer.observe(wrapEl)
    observer.observe(contentEl)
    return () => {
      observer.unobserve(wrapEl)
      observer.unobserve(contentEl)
    }
  }, [observer, wrapRef, contentRef])

  const [style, api] = useSpring(() => ({
    from: {
      opacity: 0,
      maxHeight: 800,
    },
  }))

  useIsomorphicLayoutEffect(() => {
    const maxHeight =
      item.isSelected && item?.size?.content?.height > 0
        ? item.size.content.height
        : 800
    api.start({
      to: {
        opacity: 1,
        maxHeight,
      },
      // immediate: true,
    })
  }, [item, api])

  return (
    <Wrap
      ref={wrapRef}
      // autoHeight={item.isSelected}
      data-observed-group={item.key}
      data-observed-id={'wrap'}
      style={{
        '--item-wrap-height': `${item?.size?.wrap?.height ?? 0}px`,
        '--item-content-height': `${item?.size?.content?.height ?? 0}px`,
        ...style,
      }}
    >
      <Content
        ref={contentRef}
        data-observed-group={item.key}
        data-observed-id={'content'}
      >
        {children}
      </Content>
    </Wrap>
  )
}
