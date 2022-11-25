import React, { useCallback, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import styled, { css, keyframes } from 'styled-components'
import { Body, CardTitle, Small } from './Primitives'
import { usePagePropsContext } from './PagePropsContext'
import PortableText from './PortableText'
import * as ScrollArea from '@radix-ui/react-scroll-area'

const ScrollFrame = styled(ScrollArea.Root)`
  position: relative;
  width: 100%;
  height: 100%;
`
const ScrollViewport = styled(ScrollArea.Viewport)`
  position: relative;
  width: 100%;
  height: 100%;
`
const Scrollbar = styled(ScrollArea.Scrollbar)``
const Thumb = styled(ScrollArea.Thumb)``
const Corner = styled(ScrollArea.Corner)``

const minHeight = 10
const maxHeight = 80

const slideDown = keyframes`
  from {
    height: ${minHeight}rem;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
`

const slideUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: ${minHeight}rem;
  }
`

const Wrap = styled.div`
  width: 100%;
  height: auto;
  /* @media (min-width: 1024px) {
    height: 100%;
    overflow-y: scroll;
  } */
`
const Root = styled(Accordion.Root)`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 100%;
`
const Item = styled(Accordion.Item)`
  position: relative;
  color: currentColor;
  border-bottom: var(--border);
  align-self: stretch;
  &:first-child {
    margin-top: 0;
    /* border-top: none; */
  }
  &:focus-within {
    position: relative;
    z-index: 1;
  }
  &[data-state='closed'] {
    overflow: hidden;
    padding-bottom: 6rem;
  }
  &[data-state='open'] {
    overflow: hidden;
    min-height: 0;
  }
`

const InfoAccordion = () => {
  const pageProps = usePagePropsContext()
  const { about } = pageProps
  const blocks = [
    {
      value: 'missionStatement',
      label: 'Mission',
      content: about?.missionStatement,
    },
    {
      value: 'aboutText',
      label: 'Über Mich',
      content: about?.aboutText,
    },
    // {
    //   value: 'anderes',
    //   label: 'Anderes',
    //   content: about?.aboutText,
    // },
    // {
    //   value: 'nochMehr',
    //   label: 'Nochmehr',
    //   content: about?.aboutText,
    // },
  ].filter((block) => block.content.length > 0)

  const [evenLayout, setEvenLayout] = useState(false)

  const handleValueChange = useCallback(
    (value) => {
      console.log({ value })
      if (evenLayout && value === '') {
        setEvenLayout(false)
        return
      }
      if (!evenLayout && value !== '') {
        setEvenLayout(true)
      }
    },
    [evenLayout]
  )
  return (
    <ScrollFrame>
      <ScrollViewport>
        <Root
          type="multiple"
          // type="single"
          // defaultValue={blocks[0].value}
          // onValueChange={handleValueChange}
          // collapsible
        >
          {blocks.map((block) => {
            return (
              <Item
                value={block.value}
                key={block.value}
                style={{
                  flex: '1 0 auto',
                }}
              >
                <AccordionTrigger>{block.label}</AccordionTrigger>
                <AccordionContent>
                  <PortableText value={block.content} />
                </AccordionContent>
              </Item>
            )
          })}
        </Root>
      </ScrollViewport>
      <Scrollbar orientation="vertical">
        <Thumb />
      </Scrollbar>
    </ScrollFrame>
  )
}

const Header = styled(Accordion.Header)`
  all: unset;
  display: flex;
  flex: 0 0 auto;
  /* border-bottom: 1px solid var(--color-bg); */
  &[data-state='open'] {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: var(--color-bg);
    /* border-color: var(--color-blue); */
  }
`
const Trigger = styled(Accordion.Trigger)`
  all: unset;
  padding: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--padding-page);
  cursor: pointer;
`
const TriggerText = styled(CardTitle)`
  display: block;
  position: relative;
`
const ChevronDown = styled(ChevronDownIcon)`
  color: currentColor;
  transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
  [data-state='open'] > & {
    transform: rotate(180deg);
  }
`

const AccordionTrigger = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <Header>
      <Trigger {...props} ref={forwardedRef}>
        <TriggerText>{children}</TriggerText>
        <ChevronDown aria-hidden />
      </Trigger>
    </Header>
  )
)
AccordionTrigger.displayName = 'AccordionTrigger'

const CoveringTrigger = styled(Accordion.Trigger)`
  display: block;
  position: relative;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const Content = styled(Accordion.Content)`
  overflow: hidden;
  &[data-state='open'] {
    /* animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1); */
    position: relative;
  }
  &[data-state='closed'] {
    /* animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1); */
    position: absolute;
  }
`
const ContentText = styled(Body).attrs({ as: 'div' })`
  position: relative;
  padding: 0 var(--padding-page) var(--padding-page) var(--padding-page);
`

const AccordionContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <Content {...props} ref={forwardedRef} forceMount>
      <ContentText>{children}</ContentText>
      {/* {props['data-state'] === 'closed' && <CoveringTrigger />} */}
    </Content>
  )
)
AccordionContent.displayName = 'AccordionContent'

export default InfoAccordion
