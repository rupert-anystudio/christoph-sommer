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
  @media (max-width: 919px) {
    overflow: visible !important;
  }
`
const Scrollbar = styled(ScrollArea.Scrollbar)``
const Thumb = styled(ScrollArea.Thumb)``
const Corner = styled(ScrollArea.Corner)``
const RootWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
const ItemWrap = styled.div`
  position: relative;
  color: currentColor;
  background-color: var(--color-bg);
  border-bottom: var(--border-less);
  border-color: var(--color-border);
  &:focus-within {
    z-index: 1;
  }
  &:last-child {
    border-bottom: none;
  }
  flex: 0 0 auto;
  &[data-state='open'] {
    /* max-height: none; */
  }
  &[data-state='closed'] {
    /* overflow: hidden;
    max-height: 12rem; */
    /* &:after {
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
    } */
  }
`
const ItemHeader = styled(Accordion.Header)`
  all: unset;
  display: flex;
  flex: 0 0 auto;
  &[data-state='open'] {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: var(--color-bg);
  }
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--color-bg);
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
  position: relative;
  &[data-state='open'] {
    max-height: none;
  }
  &[data-state='closed'] {
    max-height: 12rem;
  }
`
const ContentText = styled(Body).attrs({ as: 'div' })`
  position: relative;
  padding: var(--padding-page);
  padding-top: calc(var(--padding-page) / 2);
`

const InfoAccordion = ({ blocks, setBlockRef, rootProps, rootRef }) => {
  return (
    <ScrollFrame>
      <ScrollViewport>
        <RootWrap ref={rootRef}>
          <Root {...rootProps}>
            {blocks.map((block) => {
              return (
                <Item asChild value={block.value} key={block.value}>
                  <ItemWrap
                    className="accordion-item"
                    ref={setBlockRef(block.value)}
                  >
                    <ItemHeader>
                      <Trigger>
                        <TriggerText>{block.label}</TriggerText>
                        <ChevronDown aria-hidden />
                      </Trigger>
                    </ItemHeader>
                    <Content forceMount className="accordion-item-content">
                      <ContentText>
                        <PortableText value={block.content} />
                      </ContentText>
                      {/* {props['data-state'] === 'closed' && <CoveringTrigger />} */}
                    </Content>
                  </ItemWrap>
                </Item>
              )
            })}
          </Root>
        </RootWrap>
      </ScrollViewport>
      <Scrollbar orientation="vertical">
        <Thumb />
      </Scrollbar>
    </ScrollFrame>
  )
}

export default InfoAccordion
