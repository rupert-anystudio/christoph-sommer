import styled from 'styled-components'
import Notification from '../Notification'
import PortableText from '../PortableText'
import { CircleButton, Title } from '../Primitives'
import { useCallback } from 'react'
import { Arrow } from './Arrow'
import { PopoverAnimation } from './PopoverAnimation'

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

export const AnnoucementNotification = ({
  style,
  className,
  annoucement,
  amount,
}) => {
  const handleResize = useCallback((args) => {
    console.log('handleResize', args)
  }, [])

  const renderContent = useCallback(
    ({ floatingProps, arrowProps, transformOrigin, isOpen, close }) => (
      <Floating {...floatingProps}>
        <PopoverAnimation style={{ transformOrigin }} isOpen={isOpen}>
          <Content>
            <Title as="h1">{annoucement.title}</Title>
            <PortableText value={annoucement.content} />
            <button onClick={close}>{'Close'}</button>
          </Content>
          <Arrow {...arrowProps} />
        </PopoverAnimation>
      </Floating>
    ),
    [annoucement]
  )

  return (
    <Wrap style={style} className={className}>
      <Notification
        arrowSize={30}
        transitionDelay={800}
        onResize={handleResize}
        renderContent={renderContent}
      >
        {(notificationProps) => (
          <CircleButton {...notificationProps}>{amount}</CircleButton>
        )}
      </Notification>
    </Wrap>
  )
}
