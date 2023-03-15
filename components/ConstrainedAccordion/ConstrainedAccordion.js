import { config, useSpring } from '@react-spring/web'
import { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { ConstrainedAccordionItem } from './ConstrainedAccordionItem'
import { Dev } from './Elements'
import { Scroll } from './Scroll'
import { springConfig } from './springConfig'
import { useItemLayout } from './useItemLayout'
import { useObservedElements } from '../../any-hooks/useObservedElements'
import { useOccludedContent } from './useOccludedContent'
import { useSelected } from './useSelected'

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  max-height: 100%;
  @media (min-width: 800px) {
    height: 100%;
  }
`

const Content = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  overflow: hidden;
  /* touch-action: ${(p) => (p.isOccluded ? 'auto' : 'none')}; */
`

export const ConstrainedAccordion = ({
  items: items = [],
  renderItem = () => null,
}) => {
  /* prettier-ignore */
  const {
    selected,
    onSelect,
    onDismiss,
  } = useSelected()
  /* prettier-ignore */
  const [observer, dimensions] = useObservedElements()

  const wrapRef = useRef(null)
  useEffect(() => {
    const wrapEl = wrapRef.current
    if (!wrapEl) return
    observer.observe(wrapEl)
    return () => {
      observer.unobserve(wrapEl)
    }
  }, [observer, wrapRef])

  const preparedItems = useMemo(() => {
    return items.map((item, index) => {
      const isSelected = item.key === selected
      const isFirst = index === 0
      const isLast = index === items.length - 1
      return {
        ...item,
        isSelected,
        isFirst,
        isLast,
        onSelect: () => onSelect(item.key),
        onDismiss,
      }
    })
  }, [items, selected, onDismiss, onSelect])

  const wrapHeight = dimensions?.layout?.wrap?.height ?? 0
  const minHeightCalculated = wrapHeight / preparedItems.length
  const minHeightBase = 90
  const minHeight = Math.max(minHeightBase, minHeightCalculated)

  const measuredItems = preparedItems.reduce((acc, item, index) => {
    const prevItem = acc[index - 1] ?? {}
    const maxHeight = dimensions?.item?.[item.key]?.height
    const currentHeight = item.isSelected && maxHeight ? maxHeight : minHeight
    const currentY = (prevItem?.currentY ?? 0) + (prevItem?.currentHeight ?? 0)
    acc.push({
      ...item,
      maxHeight,
      currentHeight,
      currentY,
    })
    return acc
  }, [])

  const currentContentHeight = measuredItems.reduce(
    (acc, curr) => acc + curr.currentHeight,
    0
  )

  const scrollRef = useRef(null)
  const [viewportY, setViewportY] = useSpring(() => ({
    immediate: false,
    y: 0,
    onChange: (_, ctrl) => {
      if (!scrollRef.current) return
      const y = ctrl.get().y
      scrollRef.current.scroll(0, y)
    },
    config: springConfig,
  }))

  // useEffect(() => {
  //   const selectedItem
  // }, [preparedItems])

  // console.log({ measuredItems })

  return (
    <>
      <Wrap
        ref={wrapRef}
        data-observed-group={'layout'}
        data-observed-id={'wrap'}
      >
        <Scroll viewportRef={scrollRef}>
          <Content style={{ height: currentContentHeight }}>
            {measuredItems.map((item) => {
              return (
                <ConstrainedAccordionItem
                  key={item.key}
                  itemKey={item.key}
                  observer={observer}
                  setViewportY={setViewportY}
                  {...item}
                >
                  {renderItem(item)}
                </ConstrainedAccordionItem>
              )
            })}
          </Content>
        </Scroll>
      </Wrap>
      {true && (
        <Dev>
          <pre>
            {JSON.stringify(
              {
                wrapHeight,
                currentContentHeight,
                minHeightCalculated,
                minHeightBase,
                minHeight,
              },
              null,
              2
            )}
          </pre>
        </Dev>
      )}
    </>
  )
}
