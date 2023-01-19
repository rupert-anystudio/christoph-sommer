import {
  animated,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web'
import { useHover } from '@use-gesture/react'
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

const Content = styled.div`
  flex: 0;
  position: relative;
  width: 100%;
  height: auto;
`

export const ConstrainedAccordionItem = ({ children, item, observer }) => {
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
  }))

  useIsomorphicLayoutEffect(() => {
    // const maxHeight = item?.size?.height
    // if (!maxHeight) return
    // const height = item.isSelected ? maxHeight : 90
    api.start({
      to: {
        opacity: 1,
        height: item.currentHeight,
      },
    })
  }, [item, api])

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
    <Wrap style={style}>
      <Content
        ref={contentRef}
        data-observed-group={'item'}
        data-observed-id={item.key}
      >
        {children}
      </Content>
    </Wrap>
  )
}
