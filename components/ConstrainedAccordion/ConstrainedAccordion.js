import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ConstrainedAccordionItem } from './ConstrainedAccordionItem'
import { Dev } from './Elements'
import { Scroll } from './Scroll'
import { useObservedElements } from './useObservedElements'
import { useOccludedContent } from './useOccludedContent'

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
  touch-action: ${(p) => (p.isOccluded ? 'auto' : 'none')};
`

const useSelected = () => {
  const [selected, setSelected] = useState(null)
  const onSelect = useCallback((key) => {
    setSelected(key)
  }, [])
  const onDismiss = useCallback(() => {
    setSelected(null)
  }, [])
  const hasSelection = selected !== null
  return {
    selected,
    hasSelection,
    onSelect,
    onDismiss,
  }
}

const useItemLayout = (items, dimensions) => {
  const [layout, setLayout] = useState(null)
  useEffect(() => {
    if (!items || !dimensions) return
    const measuredItems = items.map(({ key }) => {
      const size = dimensions[key] ?? {}
      return {
        key,
        wrap: size?.wrap?.height,
        content: size?.content?.height,
      }
    })
    const contentHeightCalculated = measuredItems.reduce((acc, item) => {
      const itemHeight = item?.wrap ?? 0
      acc += itemHeight
      return acc
    }, 0)
    setLayout({
      contentHeightCalculated,
      measuredItems,
    })
  }, [items, dimensions])

  useEffect(() => {
    console.log({ layout })
  }, [layout])

  return layout
}

export const ConstrainedAccordion = ({
  items = [],
  renderItem = () => null,
}) => {
  /* prettier-ignore */
  const {
    isOccluded,
    contentDimensions,
    wrapDimensions,
    wrapRef,
    contentRef
  } = useOccludedContent()
  /* prettier-ignore */
  const {
    selected,
    hasSelection,
    onSelect,
    onDismiss,
  } = useSelected()
  /* prettier-ignore */
  const {
    dimensions,
    observer,
  } = useObservedElements()
  /* prettier-ignore */
  const layout = useItemLayout(items, dimensions)

  const renderItems = items.map((item, index) => {
    const size = dimensions?.[item.key] ?? {}
    const isOccluded = size?.content?.height > size?.wrap?.height
    const isSelected = item.key === selected
    return {
      ...item,
      index,
      isSelected,
      isOccluded,
      size,
      isFirst: index === 0,
      isLast: index === items.length - 1,
      onSelect: () => onSelect(item.key),
      onDismiss,
      hasSelection,
    }
  })

  return (
    <>
      <Wrap ref={wrapRef}>
        <Scroll>
          <Content ref={contentRef} isOccluded={isOccluded}>
            {renderItems.map((item) => {
              return (
                <ConstrainedAccordionItem
                  key={item.key}
                  observer={observer}
                  item={item}
                >
                  {renderItem(item)}
                </ConstrainedAccordionItem>
              )
            })}
          </Content>
        </Scroll>
      </Wrap>
      {false && (
        <Dev>
          <pre>
            {JSON.stringify(
              {
                wrapHeight: wrapDimensions?.height,
                contentHeight: contentDimensions?.height,
                ...layout,
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
