import styled from 'styled-components'
import { forwardRef } from 'react'
import { animated } from '@react-spring/web'
import PortableText from '../PortableText'
import { CircleButton, Title } from '../Primitives'
import { usePopoverAnimation } from '../../hooks/usePopoverAnimation'
import {
  FloatingFocusManager as FocusManager,
  FloatingPortal as Portal,
} from '@floating-ui/react'
import { useNotificationPopover } from '../../hooks/useNotificationPopover'
import { useSvgBubble } from './useSvgBubble'
import { SvgBubble } from './SvgBubble'
import { usePullAnimation } from './PullAnimation'

const Wrap = styled.div`
  position: absolute;
  display: block;
  transform: translate3d(-50%, -50%, 0px);
  z-index: 2;
`

const Floating = styled.div`
  position: relative;
  --color-bg: blue;
  --color-txt: white;
`

const Content = styled.div`
  position: relative;
  padding: 1rem;
  color: var(--color-txt);
  width: clamp(120px, 90vw, 800px);
  /* background: var(--color-bg); */
`

const Arrow_ = styled.div`
  position: absolute;
  visibility: hidden;
  /* background: red; */
  svg {
    width: 100%;
    height: 100%;
  }
  path {
    fill: var(--color-bg);
    stroke: none;
  }
`

const Arrow = forwardRef((props, ref) => (
  <Arrow_ {...props} ref={ref}>
    <svg viewBox={'0 0 50 50'} width="100%" height="100%">
      <path d={`M 25,0 L 50,50 L 0,50 Z`} />
    </svg>
  </Arrow_>
))
Arrow.displayName = 'Arrow'

const Animation = ({ children, transformOrigin, isOpen }) => {
  const props = usePopoverAnimation(isOpen)
  return (
    <animated.div
      style={{
        transformOrigin,
        ...props,
      }}
    >
      {children}
    </animated.div>
  )
}

export const HeaderNotification = ({ style, annoucement, amount }) => {
  const { onResize, bubbleProps } = useSvgBubble({
    baseOffset: 15,
    safeZone: 800,
  })

  const {
    isOpen,
    isMounted,
    close,
    referenceProps,
    focusManagerProps,
    floatingProps,
    arrowProps,
    transformOrigin,
    currentSide,
    arrowX,
    arrowY,
    arrowSize,
  } = useNotificationPopover({
    arrowLength: 140,
    arrowWidth: 40,
    collisionPadding: 10,
    transitionDelay: 800,
    onResize,
  })

  const [pullStyle, pullProps] = usePullAnimation()

  return (
    <>
      <Wrap style={style}>
        <CircleButton {...referenceProps}>{amount}</CircleButton>
      </Wrap>
      <Portal>
        {isMounted && (
          <FocusManager {...focusManagerProps}>
            <Floating {...floatingProps}>
              <Animation transformOrigin={transformOrigin} isOpen={isOpen}>
                <animated.div style={pullStyle}>
                  <div {...pullProps}>
                    <Arrow {...arrowProps} />
                    {bubbleProps && (
                      <SvgBubble
                        {...bubbleProps}
                        pullStyle={pullStyle}
                        arrowState={{
                          currentSide,
                          arrowX,
                          arrowY,
                          arrowSize,
                        }}
                      />
                    )}
                    <Content>
                      <Title as="h1">{annoucement.title}</Title>
                      <PortableText value={annoucement.content} />
                      <button onClick={close}>{'Close'}</button>
                    </Content>
                  </div>
                </animated.div>
              </Animation>
            </Floating>
          </FocusManager>
        )}
      </Portal>
    </>
  )
}
