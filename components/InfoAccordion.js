import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import styled, { keyframes } from 'styled-components'
import { Body, Small } from './Primitives'
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
  > div {
    height: 100%;
  }
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

const Root = styled(Accordion.Root)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
`
const Item = styled(Accordion.Item)``
const Element = styled.div`
  position: relative;
  &:focus-within {
    position: relative;
    z-index: 1;
    /* --color-bg: var(--color-white); */
  }
  background-color: var(--color-bg);
  position: relative;
  color: currentColor;
  border-bottom: var(--border-less);
  border-color: var(--color-border);
  &:last-child {
    border-bottom: none;
  }
  &[data-state='closed'] {
    overflow: hidden;
    flex: 0 0 auto;
    min-height: 12rem;
    /* padding-bottom: 6rem; */
    &:after {
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      top: 6rem;
      bottom: 0;
      left: 0;
      left: right;
      background-image: linear-gradient(transparent 0%, var(--color-bg) 100%);
      pointer-events: none;
    }
  }
  &[data-state='open'] {
    min-height: 0;
    flex: 0 0 auto;
    /* flex: 1 1 100%; */
  }
`

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
    /* box-shadow: 1px 3px 16px -12px black; */
    /* backdrop-filter: blur(400px); */
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
  margin-bottom: calc(-1 * var(--padding-page));
  cursor: pointer;
`
const TriggerText = styled(Small)`
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

const Content = styled(Accordion.Content)`
  overflow: hidden;
  &[data-state='open'] {
    --color-speech-txt: #e4cceb;
    --color-speech-bg: #571c66;
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
  padding: var(--padding-page);
  padding-top: calc(var(--padding-page) / 2);
`

const InfoAccordion = ({ blocks, rootProps }) => {
  return (
    <ScrollFrame>
      <ScrollViewport>
        <Root {...rootProps}>
          {blocks.map((block) => {
            return (
              <Item asChild value={block.value} key={block.value}>
                <Element>
                  <Header>
                    <Trigger>
                      <TriggerText>{block.label}</TriggerText>
                      <ChevronDown aria-hidden />
                    </Trigger>
                  </Header>
                  <Content forceMount>
                    <ContentText>
                      <PortableText value={block.content} />
                    </ContentText>
                    {/* {props['data-state'] === 'closed' && <CoveringTrigger />} */}
                  </Content>
                </Element>
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

export default InfoAccordion
