import { useCallback } from 'react'
import styled from 'styled-components'
import useAboutAccordionItems from '../hooks/useAboutAccordionItems'
import Scroll from './Scroll'
import PortableText from './PortableText'
import { Small } from './Primitives'
import useAnimatedAccordion from '../hooks/useAnimatedAccordion'
import { EntryToggle } from './EntryToggle'
import EntryGradient from './EntryGradient'

const Content = styled.div`
  position: relative;
  --accordion-item-minheight: 220px;
  --item-gradientheight: 120px;
`
const Item = styled.div`
  position: relative;
  overflow: hidden;
  &:not(:last-child) {
    border-bottom: var(--border);
  }
`
const ItemHeader = styled.div`
  position: relative;
  padding: var(--padding-page);
  padding-bottom: 0.8rem;
  background-color: var(--color-bg);
`
const ItemContent = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 var(--padding-page);
  padding-bottom: 8rem;
  max-height: ${(p) => (p.isOpen ? 'none' : 'var(--accordion-item-minheight)')};
`

const classes = {
  entries: 'accordion-items',
  entry: 'accordion-item',
  entryChild: 'accordion-item-content',
}

const LandingAccordion = () => {
  const items = useAboutAccordionItems()
  const { value, rootRef, onValueChange } = useAnimatedAccordion({
    classes,
  })

  const onEntryClick = useCallback(
    (val) => (e) => {
      e.preventDefault()
      onValueChange(val)
    },
    [onValueChange]
  )
  return (
    <Scroll>
      <Content ref={rootRef}>
        <div className="accordion-items">
          {items.map((item) => {
            const { key, label, content } = item
            const isOpen = key === value
            return (
              <Item key={key} className={`accordion-item`}>
                {/* <Sticky> */}
                <ItemHeader className="accordion-item-header">
                  <Small>{label}</Small>
                </ItemHeader>
                {/* </Sticky> */}
                <ItemContent className="accordion-item-content" isOpen={isOpen}>
                  <PortableText value={content} />
                </ItemContent>
                <EntryGradient isSelected={isOpen} />
                <EntryToggle isSelected={isOpen} onClick={onEntryClick(key)} />
              </Item>
            )
          })}
        </div>
      </Content>
    </Scroll>
  )
}

export default LandingAccordion
