import { useCallback } from 'react'
import styled from 'styled-components'
import useAboutAccordionItems from '../hooks/useAboutAccordionItems'
import useGsapAccordion from '../hooks/useGsapAccordion'
import Scroll from './Scroll'
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
  max-height: ${(p) => (p.isOpen ? 'none' : '96px')};
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 96px;
    background-image: linear-gradient(transparent, var(--color-bg));
    transition: transform 0.34s ease-in-out;
    transform: translate3d(0, ${(p) => (p.isOpen ? '100%' : '0%')}, 0);
  }
`
const Sticky = styled.div`
  position: relative;
  position: sticky;
  top: 0;
  z-index: 1;
`

const LandingAccordion = () => {
  const items = useAboutAccordionItems()
  const { value, rootRef, onValueChange } = useGsapAccordion()

  const onItemClick = useCallback(
    (key) => (e) => {
      e.preventDefault()
      onValueChange(key)
    },
    [onValueChange]
  )

  return (
    <Scroll rootRef={rootRef}>
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
                isOpen={isOpen}
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
