import { forwardRef } from 'react'
import styled, { keyframes } from 'styled-components'
import Notification from '../Notification'
import PortableText from '../PortableText'
import { CircleButton, Title } from '../Primitives'
import { PopoverAnimation, ShiftAnimation } from './Animations'
import { useAnnoucements } from './useAnnoucements'

const Wrap = styled.div`
  position: absolute;
  display: block;
`

const Floating = styled.div`
  --color-bg: blue;
  --color-txt: white;
`

const Content = styled.div`
  position: relative;
  padding: 2rem;
  background: var(--color-bg);
  color: var(--color-txt);
  width: clamp(120px, 90vw, 600px);
  box-shadow: 1px 4px 16px -6px black;
  border-radius: 2px;
`

const PopoverContent = ({ title, content, actions = [] }) => (
  <Content>
    <Title as="h1">{title}</Title>
    <PortableText value={content} />
    {actions
      .filter((a) => a.isVisible)
      .map(({ key, ...actionProps }) => (
        <button key={key} {...actionProps}>
          {key}
        </button>
      ))}
  </Content>
)

const Arrow = styled.div`
  position: absolute;
  svg {
    width: 100%;
    height: 100%;
  }
  path {
    fill: var(--color-bg);
    stroke: none;
  }
`

const ArrowContent = () => (
  <svg viewBox={'0 0 50 50'} width="100%" height="100%">
    <path d={`M 25,0 L 50,50 L 0,50 Z`} />
  </svg>
)

export const AnnoucementNotification = forwardRef(
  ({ style, className }, ref) => {
    const { annoucement, amount, onNextClick } = useAnnoucements()
    if (!annoucement) return null

    return (
      <Wrap style={style} className={className} ref={ref}>
        <Notification
          label={amount}
          arrowSize={20}
          transitionDelay={200}
          referenceComponent={CircleButton}
        >
          {({ floatingProps, arrowProps, transformOrigin, isOpen }) => (
            // <ShiftAnimation
            //   x={floatingProps.style.left}
            //   y={floatingProps.style.top}
            // >
            <Floating {...floatingProps}>
              <PopoverAnimation isOpen={isOpen} style={{ transformOrigin }}>
                <PopoverContent
                  title={annoucement.title}
                  content={annoucement.content}
                  actions={[
                    {
                      key: 'next',
                      onClick: onNextClick,
                      isVisible: amount > 1,
                    },
                  ]}
                />
                <Arrow {...arrowProps}>
                  <ArrowContent />
                </Arrow>
              </PopoverAnimation>
            </Floating>
            // </ShiftAnimation>
          )}
        </Notification>
      </Wrap>
    )
  }
)

AnnoucementNotification.displayName = 'AnnoucementNotification'
