import styled from 'styled-components'
import Card from './Card'
import { SmallPill } from './Primitives'

const Wrap = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 23rem;
  background: linear-gradient(
    transparent 0%,
    var(--color-bg) 85%,
    var(--color-bg) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
`

const Content = styled.div`
  padding: var(--padding-card-v) var(--padding-card-h);
  @media (hover: hover) {
    transform: translate3d(0, 100%, 0);
    transition: transform 0.3s ease-in-out;
    transition-timing-function: ease-in;
    ${Card}:hover & {
      transform: translate3d(0, 0, 0);
      transition-timing-function: ease-out;
    }
  }
`

const Toggle = styled(SmallPill).attrs({ as: 'button' })`
  background: var(--color-txt);
  color: var(--color-bg-root);
  appearance: none;
  border: none;
  @media (hover: hover) {
    cursor: pointer;
  }
`

const CardToggle = () => {
  return (
    <Wrap>
      <Content>
        <Toggle>...</Toggle>
      </Content>
    </Wrap>
  )
}

export default CardToggle
