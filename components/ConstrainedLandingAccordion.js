import styled from 'styled-components'
import useAboutAccordionItems from '../hooks/useAboutAccordionItems'
import PortableText from './PortableText'
import { Small } from './Primitives'
import ConstrainedAccordion from './ConstrainedAccordion'

const Item = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: var(--padding-page);
  border-top: ${(p) => (p.hasBorder ? 'var(--border)' : 'none')};
  cursor: pointer;
`

const Label = styled(Small)`
  flex: 0;
  position: relative;
  width: 100%;
  margin: 0 0 0.8rem 0;
  display: block;
  z-index: 1;
`

const GradientOverlay = styled.div`
  position: absolute;
  left: 0;
  top: var(--item-wrap-height);
  width: 100%;
  height: 120px;
  transform: translateY(-100%);
  transition: opacity 0.2s ease-in-out;
  opacity: ${(p) => (p.isHidden ? '0' : '1')};
  pointer-events: none;
  background: linear-gradient(
    rgba(var(--color-bg-value), var(--color-bg-value), var(--color-bg-value), 0)
      0%,
    rgba(var(--color-bg-value), var(--color-bg-value), var(--color-bg-value), 1)
      100%
  );
`

export const ConstrainedLandingAccordion = () => {
  const items = useAboutAccordionItems()
  return (
    <ConstrainedAccordion
      items={items}
      renderItem={({
        label,
        content,
        isFirst,
        isSelected,
        isOccluded,
        onSelect,
        onDismiss,
      }) => (
        <>
          <Item
            hasBorder={!isFirst}
            onClick={isSelected ? onDismiss : onSelect}
          >
            <Label>{label}</Label>
            <PortableText value={content} />
            {/* <GradientOverlay isHidden={isSelected || !isOccluded} /> */}
          </Item>
        </>
      )}
    />
  )
}
