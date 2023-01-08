import styled, { keyframes } from 'styled-components'
import useObservedElement from '../useObservedElement'
import AnnoucementBubble from './AnnoucementBubble'
import AnnoucementContent from './AnnoucementContent'

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

const ScaleIn = styled.div`
  transform-origin: var(--radix-popover-content-transform-origin);
  position: relative;
  animation: ${scaleIn} 0.2s ease-out;
`

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  outline: 1px solid red;
`

const Annoucement = ({ title, content }) => {
  const [wrapRef, wrapSize] = useObservedElement()
  return (
    <>
      {wrapSize && (
        <ScaleIn>
          <AnnoucementBubble width={wrapSize.width} height={wrapSize.height} />
        </ScaleIn>
      )}
      <Wrap ref={wrapRef}>
        <ScaleIn>
          <AnnoucementContent
            title={title}
            content={content}
            style={{
              visibility: wrapSize ? 'visible' : 'hidden',
            }}
          />
        </ScaleIn>
      </Wrap>
    </>
  )
}

export default Annoucement
