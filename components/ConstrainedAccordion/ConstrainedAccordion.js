import { useMemo } from 'react'
import styled from 'styled-components'
import { ConstrainedAccordionItem } from './ConstrainedAccordionItem'
import { Dev } from './Elements'
import { Scroll } from './Scroll'
import { useItemLayout } from './useItemLayout'
import { useObservedElements } from './useObservedElements'
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
  touch-action: ${(p) => (p.isOccluded ? 'auto' : 'none')};
`

export const ConstrainedAccordion = ({
  items: givenItems = [],
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

  const items = useMemo(() => {
    return givenItems.map((item, index) => {
      const maxHeight = dimensions?.item?.[item.key]?.height
      const isSelected = item.key === selected
      const currentHeight = isSelected && maxHeight ? maxHeight : 90
      return {
        ...item,
        isSelected,
        currentHeight,
        isFirst: index === 0,
        isLast: index === givenItems.length - 1,
        onSelect: () => onSelect(item.key),
        onDismiss,
      }
    })
  }, [givenItems, dimensions, selected, onDismiss, onSelect])

  return (
    <>
      <Wrap ref={wrapRef}>
        <Scroll>
          <Content ref={contentRef} isOccluded={isOccluded}>
            {items.map((item) => {
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
