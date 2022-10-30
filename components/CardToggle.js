import styled from 'styled-components'
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
  padding: var(--padding-card-v) var(--padding-card-h);
`

const Toggle = styled(SmallPill).attrs({ as: 'button' })`
  background: var(--color-txt);
  color: var(--color-bg);
  appearance: none;
  border: none;
  @media (hover: hover) {
    cursor: pointer;
  }
`

const CardToggle = () => {
  return (
    <Wrap>
      <Toggle>...</Toggle>
    </Wrap>
  )
}

export default CardToggle
