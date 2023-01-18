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

const Wrap = styled.div`
  position: absolute;
  display: block;
  transform: translate3d(-50%, -50%, 0px);
  z-index: 2;
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
`

const Title = styled(TitlePrimitive).attrs({ as: 'h1' })`
  margin-bottom: 1rem;
`

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(-50%) translateY(-50%);
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
      length: 140,
      width: 12,
    },
  })

  const [pullStyle, pullProps] = usePullAnimation({ isOpen, currentSide })

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
                      <CloseButton onClick={close}>{'Close'}</CloseButton>
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
