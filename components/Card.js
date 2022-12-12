import styled from 'styled-components'

const Card = styled.div`
  position: relative;
  padding: var(--padding-card-v) var(--padding-card-h);
  padding-bottom: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  overflow: hidden;
  border: var(--border-card);
  > * {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
  @media (hover: hover) {
    /* cursor: pointer; */
  }
`

export default Card
