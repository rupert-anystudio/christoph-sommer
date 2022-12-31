import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { animated, useSpring } from '@react-spring/web'
import usePagePropsContext from '../hooks/usePagePropsContext'
import { CircleButton } from './Primitives'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import Annoucement from './Annoucement'

const Wrap = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
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
  /* animation: ${scaleIn} 0.2s ease-out; */
  outline: none;
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
  const { annoucements } = usePagePropsContext()
  const [mounted, setMounted] = useState(false)

  useIsomorphicLayoutEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !annoucements || annoucements.length < 1) return null
  const { title, content } = annoucements[0]

  return (
    <Wrap>
      <Root defaultOpen>
        <AnimatedTrigger>
          <Trigger asChild>
            <CircleButton>{annoucements.length}</CircleButton>
          </Trigger>
        </AnimatedTrigger>
        <Portal>
          <Content
            sideOffset={5}
            collisionPadding={10}
            alignOffset={-60}
            align="start"
            style={{
              transformOrigin: 'var(--radix-popover-content-transform-origin)',
            }}
          >
            <Arrow />
            <Annoucement title={title} content={content} />
          </Content>
        </Portal>
      </Root>
    </Wrap>
  )
}

export default Annoucements
