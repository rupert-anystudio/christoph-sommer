import { useCallback } from 'react'
import styled from 'styled-components'
import useAboutAccordionItems from '../hooks/useAboutAccordionItems'
import Scroll from './Scroll'
import PortableText from './PortableText'
import { Small } from './Primitives'
import useAnimatedAccordion from '../hooks/useAnimatedAccordion'

const Content = styled.div`
  position: relative;
  --accordion-item-minheight: 128px;
`
const Item = styled.div`
  position: relative;
  &:not(:last-child) {
    border-bottom: var(--border);
  }
`
const ItemHeader = styled.div`
  position: relative;
  padding: var(--padding-page);
  background-color: var(--color-bg);
`
const ItemContent = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 var(--padding-page);
  padding-bottom: calc(var(--padding-page) * 2);
  max-height: ${(p) => (p.isOpen ? 'none' : 'var(--accordion-item-minheight)')};
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: -100px;
    right: -100px;
    height: 200px;
    background: var(--color-bg);
    transition: transform 0.34s ease-in-out;
    transform: translate3d(0, ${(p) => (p.isOpen ? '100%' : '0%')}, 0);
    box-shadow: 0px 0px calc(var(--accordion-item-minheight) / 2)
      calc(var(--accordion-item-minheight) / 2) var(--color-bg);
  }
`
const Sticky = styled.div`
  position: relative;
  position: sticky;
  top: 0;
  z-index: 1;
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
              <Item
                key={key}
                onClick={onEntryClick(key)}
                className={`accordion-item`}
              >
                {/* <Sticky> */}
                <ItemHeader className="accordion-item-header">
                  <Small>{label}</Small>
                </ItemHeader>
                {/* </Sticky> */}
                <ItemContent className="accordion-item-content" isOpen={isOpen}>
                  <PortableText value={content} />
                </ItemContent>
              </Item>
            )
          })}
        </div>
      </Content>
    </Scroll>
  )
}

export default LandingAccordion
