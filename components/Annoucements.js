import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import usePagePropsContext from '../hooks/usePagePropsContext'
import { PortableText } from '@portabletext/react'
import { Body, CircleButton, Title } from './Primitives'
import AnnoucementBubble from './AnnoucementBubble'
import ObservedElementDimensions from './ObservedElementDimensions/ObservedElementDimensions'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import { animated, useSpring } from '@react-spring/web'

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
const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`
const Content = styled(PopoverPrimitive.Content)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 200;
  width: calc(100vw - 4rem);
  max-width: 60rem;
  animation: ${scaleIn} 0.2s ease-out;
`
const RenderedContent = styled.div`
  position: relative;
  padding: var(--padding-page);
  background-color: var(--color-bg);
  /* border: 1px solid var(--color-txt); */
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

const AnimatedTrigger = ({ children }) => {
  const style = useSpring({
    from: {
      scale: 0.1,
    },
    to: {
      scale: 1,
    },
  })
  return <animated.div style={style}>{children}</animated.div>
}

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
      <Root
      // defaultOpen
      >
        <AnimatedTrigger>
          <Trigger asChild>
            <CircleButton>{annoucements.length}</CircleButton>
          </Trigger>
        </AnimatedTrigger>
        <Portal
        // container={containerRef.current}
        // forceMount
        >
          <Content
            sideOffset={5}
            collisionPadding={10}
            alignOffset={-60}
            align="start"
            style={{
              transformOrigin: 'var(--radix-popover-content-transform-origin)',
            }}
          >
            <ObservedElementDimensions
              observedId={_id}
              observedGroup="annoucements"
            >
              <Arrow />
              <AnnoucementBubble id={_id} />
              <RenderedContent>
                {/* <Close aria-label="Schließen">✗</Close> */}
                <Title as="h1">{title}</Title>
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
