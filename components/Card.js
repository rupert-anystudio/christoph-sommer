import styled from 'styled-components'

const Card = styled.article`
  position: relative;
  padding: var(--padding-card-v) var(--padding-card-h);
  padding-bottom: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  border: var(--border-card);
  pointer-events: ${(p) => (p.isDisabled ? 'none' : 'auto')};
  /* pointer-events: none; */
  /* > * {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  } */
  @media (hover: hover) {
    /* cursor: pointer; */
  }
`

export default Card
