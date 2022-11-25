import styled from 'styled-components'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { usePagePropsContext } from './PagePropsContext'
import { PortableText } from '@portabletext/react'
import { Body } from './Primitives'
import CircleButton from './CircleButton'

const Wrap = styled.div`
  position: absolute;
  top: 77%;
  left: 102%;
  transform: translate3d(-50%, -50%, 0);
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
  width: 30,
  height: 40,
})`
  fill: var(--color-element-bg);
`
const Content = styled(PopoverPrimitive.Content)`
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 200;
  background-color: var(--color-element-bg);
  color: var(--color-element-txt);
  width: calc(100vw - 4rem);
  max-width: 60rem;
`
const RenderedContent = styled.div`
  margin-top: 2rem;
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

const PopoverContent = ({ title, content }) => {
  return (
    <Content
      sideOffset={10}
      collisionPadding={20}
      align="start"
      alignOffset={-40}
    >
      <Close aria-label="Schließen">✗</Close>
      <RenderedContent>
        <Title>{title}</Title>
        <PortableText value={content} />
      </RenderedContent>
      <Arrow />
    </Content>
  )
}

const Annoucements = () => {
  const { annoucements } = usePagePropsContext()
  if (!annoucements || annoucements.length < 1) return null
  const annoucement = annoucements[0]
  const { title, content } = annoucement
  return (
    <Wrap>
      <Root>
        <Trigger asChild>
          <CircleButton>{annoucements.length}</CircleButton>
        </Trigger>
        <Portal>
          <PopoverContent title={title} content={content} />
        </Portal>
      </Root>
    </Wrap>
  )
}

export default Annoucements
