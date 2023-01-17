import { forwardRef } from 'react'
import styled from 'styled-components'
import Notification from '../Notification'
import PortableText from '../PortableText'
import { CircleButton, Title } from '../Primitives'
import { useAnnoucements } from './useAnnoucements'
import { usePopoverAnimation } from './usePopoverAnimation'
import { animated } from '@react-spring/web'

const Wrap = styled.div`
  position: absolute;
  display: block;
`

const Floating = styled.div`
  position: relative;
  --color-bg: black;
  --color-txt: white;
`

const Content = styled.div`
  position: relative;
  padding: 2rem;
  background: var(--color-bg);
  color: var(--color-txt);
  width: clamp(120px, 90vw, 600px);
  border-radius: 4px;
`

const PopoverContent = ({
  title,
  content,
  actions = [],
  children,
  style,
  isOpen,
}) => {
  const props = usePopoverAnimation(isOpen)
  return (
    <animated.div
      style={{
        ...style,
        ...props,
      }}
    >
      {children}
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
    </animated.div>
  )
}

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
          arrowSize={30}
          transitionDelay={800}
          referenceComponent={CircleButton}
        >
          {({ floatingProps, arrowProps, transformOrigin, isOpen }) => (
            <Floating {...floatingProps}>
              <PopoverContent
                style={{ transformOrigin }}
                isOpen={isOpen}
                title={annoucement.title}
                content={annoucement.content}
                actions={[
                  {
                    key: 'next',
                    onClick: onNextClick,
                    isVisible: amount > 1,
                  },
                ]}
              >
                <Arrow {...arrowProps}>
                  <ArrowContent />
                </Arrow>
              </PopoverContent>
            </Floating>
          )}
        </Notification>
      </Wrap>
    )
  }
)

AnnoucementNotification.displayName = 'AnnoucementNotification'
