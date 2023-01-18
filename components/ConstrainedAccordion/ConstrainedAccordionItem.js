import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: ${(p) => (p.autoHeight ? '0 0 auto' : '1 0 90px')};
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

  return (
    <Wrap
      ref={wrapRef}
      autoHeight={item.isSelected}
      data-observed-group={item.key}
      data-observed-id={'wrap'}
      style={{
        '--item-wrap-height': `${item?.size?.wrap?.height ?? 0}px`,
        '--item-content-height': `${item?.size?.content?.height ?? 0}px`,
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
