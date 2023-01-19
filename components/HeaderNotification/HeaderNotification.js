import styled from 'styled-components'
import { forwardRef } from 'react'
import { animated } from '@react-spring/web'
import PortableText from '../PortableText'
import { CircleButton, Title as TitlePrimitive } from '../Primitives'
import { usePopoverAnimation } from '../../hooks/usePopoverAnimation'
import {
  FloatingFocusManager as FocusManager,
  FloatingPortal as Portal,
} from '@floating-ui/react'
import { useNotificationPopover } from '../../hooks/useNotificationPopover'
import { useSvgBubble } from './useSvgBubble'
import { SvgBubble } from './SvgBubble'
import { usePullAnimation } from './PullAnimation'
import { Actions } from './Actions'
import { formatIsoDate } from '../../lib/dateHelpers'
import { HoverAnimation } from './HoverAnimation'

const Wrap = styled.div`
  position: absolute;
  display: block;
  transform: translate3d(-50%, -50%, 0px);
  z-index: 2;
`

const Notification = styled(CircleButton)`
  box-shadow: 0px 0px 80px 10px
    ${(p) => (p.isOpen ? 'var(--color-bg)' : 'transparent')};
`

const Floating = styled.div`
  position: relative;
`

const Content = styled.div`
  position: relative;
  padding: 0 0 4rem 0;
  color: var(--color-txt);
  width: clamp(80px, 100vw, 800px);
  text-align: center;
  /* outline: 1px solid red; */
`

const Title = styled(TitlePrimitive).attrs({ as: 'h1' })`
  margin-bottom: 1rem;
`

const ClosePosition = styled.div`
  position: absolute;
  top: calc(var(--lh-small) * var(--fs-smaller) * 0.5);
  right: 10px;
  transform: translateY(-50%) translateX(50%);
  border-radius: 100%;
  border: none;
  appearance: none;
  color: var(--color-txt);
  background: var(--color-txt);
  outline: 4px solid var(--color-txt);
  padding: 0;
  margin: 0;
  text-align: center;
  pointer-events: none;
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
  font-size: var(--fs-smaller);
  line-height: var(--lh-small);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  padding: 24px;
`

const CloseCross = styled.svg.attrs({
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  viewBox: '0 0 50 50',
})`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  background: none;
  line {
    fill: none;
    stroke: currentColor;
    stroke-width: 6;
  }
`

const CloseButton = styled(ClosePosition).attrs({ as: 'button' })`
  appearance: none;
  background: var(--color-bg);
  outline: none;
  border: none;
  cursor: pointer;
  pointer-events: auto;
  &:hover {
    color: var(--color-bg);
    background: var(--color-txt);
    border: 1px solid var(--color-txt);
    outline: 1px solid var(--color-txt);
  }
`

const Arrow_ = styled.div`
  position: absolute;
  outline: 1px solid red;
  visibility: hidden;
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

export const HeaderNotification = ({
  style,
  annoucement,
  amount,
  collisionPadding = 70,
  onPreviousClick,
  onNextClick,
}) => {
  const { onResize, bubbleProps } = useSvgBubble({
    baseOffset: 20,
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
    collisionPadding,
    transitionDelay: 800,
    arrowDistance: 10,
    onResize,
    arrowSize: {
      length: 100,
      width: 12,
    },
  })

  const [pullStyle, pullProps] = usePullAnimation({ isOpen, currentSide })

  return (
    <>
      <Wrap style={style}>
        <HoverAnimation isOpen={isOpen}>
          <Notification {...referenceProps} isOpen={isOpen}>
            {amount}
          </Notification>
        </HoverAnimation>
      </Wrap>
      <Portal>
        {isMounted && (
          <FocusManager {...focusManagerProps}>
            <Floating {...floatingProps}>
              <Animation transformOrigin={transformOrigin} isOpen={isOpen}>
                <animated.div style={pullStyle}>
                  <div {...pullProps}>
                    <Arrow {...arrowProps} />

                    <ClosePosition />
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
                    <Content
                      style={{
                        maxWidth: `calc(100vw - ${collisionPadding * 2}px)`,
                      }}
                    >
                      <Actions
                        onPreviousClick={onPreviousClick}
                        onNextClick={onNextClick}
                        label={formatIsoDate(annoucement.date)}
                        amount={amount}
                      />
                      <Title>{annoucement.title}</Title>
                      <PortableText value={annoucement.content} />
                    </Content>
                    <CloseButton onClick={close}>
                      <CloseCross>
                        <line x1={5} y1={5} x2={45} y2={45} />
                        <line x1={45} y1={5} x2={5} y2={45} />
                      </CloseCross>
                    </CloseButton>
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
