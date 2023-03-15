import styled from 'styled-components'
import AnyAccordion from '../../any-components/Accordion'
import useAboutAccordionItems from '../../hooks/useAboutAccordionItems'
import PortableText from '../PortableText'
import { Entry, Label } from './LandingAccordionComponents'

const Accordion = styled(AnyAccordion)`
  --any-accordion-height: auto;
  --any-accordion-item-minheight: 100px;
  @media (min-width: 400px) {
    --any-accordion-item-minheight: 120px;
  }
  @media (min-width: 800px) {
    --any-accordion-height: 100%;
    --any-accordion-item-minheight: 150px;
  }
  @media (min-width: 1024px) {
    --any-accordion-item-minheight: 170px;
  }
  position: relative;
  display: block;
  width: 100%;
  height: var(--any-accordion-height);
`

export const LandingAccordion = () => {
  const items = useAboutAccordionItems()
  return (
    <Accordion
      items={items}
      renderItem={({ label, content, isLast, isSelected, onToggle }) => (
        <Entry hasBottomBorder={!isLast} isSelected={isSelected}>
          {/* <Label>{label}</Label> */}
          <PortableText value={content} />
        </Entry>
      )}
    />
  )
}
