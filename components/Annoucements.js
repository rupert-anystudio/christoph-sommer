import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import usePagePropsContext from '../hooks/usePagePropsContext'
import { PortableText } from '@portabletext/react'
import { Body, CircleButton } from './Primitives'
import AnnoucementBubble from './AnnoucementBubble'
import ObservedElementDimensions from './ObservedElementDimensions/ObservedElementDimensions'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

const Wrap = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  /* top: 77%;
  left: 102%; */
  top: 28.9%;
  left: 77.6%;
`

const Root = PopoverPrimitive.Root
const Trigger = PopoverPrimitive.Trigger
const Portal = PopoverPrimitive.Portal
const Close = styled(PopoverPrimitive.Close)`
  padding: 0;
  margin: 0;
  appearance: none;
  border: none;
  background: none;
  font-size: var(--fs-big);
  color: var(--color-element-txt);
  cursor: pointer;
`
const Arrow = styled(PopoverPrimitive.Arrow).attrs({
  width: 50,
  height: 80,
})`
  fill: blue;
`
const Content = styled(PopoverPrimitive.Content)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 200;
  width: calc(100vw - 4rem);
  max-width: 60rem;
`
const RenderedContent = styled.div`
  position: relative;
  padding: var(--padding-page) 0;
  > * {
    margin: 0.5em 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`
const Title = styled(Body).attrs({ as: 'h1' })``

const Annoucements = () => {
  const { annoucements, containerRef } = usePagePropsContext()
  const [mounted, setMounted] = useState(false)
  useIsomorphicLayoutEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null
  if (!annoucements || annoucements.length < 1) return null
  const annoucement = annoucements[0]
  if (!annoucement) return null
  const { title, content, _id } = annoucement
  return (
    <Wrap>
      <Root defaultOpen>
        <Trigger asChild>
          <CircleButton>{annoucements.length}</CircleButton>
        </Trigger>
        <Portal container={containerRef.current}>
          <Content
            // sideOffset={10}
            collisionPadding={20}
            alignOffset={-60}
            align="start"
          >
            <Arrow />
            <ObservedElementDimensions
              observedId={_id}
              observedGroup="annoucements"
            >
              <AnnoucementBubble id={_id} />
              <RenderedContent>
                {/* <Close aria-label="Schließen">✗</Close> */}
                <Title>{title}</Title>
                <PortableText value={content} />
              </RenderedContent>
            </ObservedElementDimensions>
          </Content>
        </Portal>
      </Root>
    </Wrap>
  )
}

export default Annoucements
