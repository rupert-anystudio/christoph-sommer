import styled from 'styled-components'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { usePagePropsContext } from './PagePropsContext'
import { PortableText } from '@portabletext/react'
import { Body } from './Primitives'

const Wrap = styled.div`
  position: absolute;
  top: 7.3rem;
  left: 29.6rem;
`

const Circle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-txt);
  color: var(--color-bg);
  line-height: 4rem;
  text-align: center;
`

const Root = PopoverPrimitive.Root
const Trigger = PopoverPrimitive.Trigger
const Portal = PopoverPrimitive.Portal
const Close = styled(PopoverPrimitive.Close)``
const Arrow = styled(PopoverPrimitive.Arrow).attrs({
  width: 30,
  height: 40,
})`
  fill: var(--color-txt);
`
const Content = styled(PopoverPrimitive.Content)`
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 200;
  background: var(--color-txt);
  color: var(--color-bg);
  width: calc(100vw - 4rem);
  max-width: 60rem;
`
const RenderedContent = styled.div`
  margin-top: 2rem;
  > * {
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
  const { annoucements } = usePagePropsContext()
  if (!annoucements || annoucements.length < 1) return null
  const annoucement = annoucements[0]
  console.log({ annoucement })
  return (
    <Wrap>
      <Root>
        <Trigger asChild>
          <Circle>{annoucements.length}</Circle>
        </Trigger>
        <Portal>
          <Content
            sideOffset={10}
            collisionPadding={20}
            align="start"
            alignOffset={-40}
          >
            <Close aria-label="Schließen">x</Close>
            <RenderedContent>
              <Title>{annoucement.title}</Title>
              <PortableText value={annoucement?.content} />
            </RenderedContent>
            <Arrow />
          </Content>
        </Portal>
      </Root>
    </Wrap>
  )
}

export default Annoucements
