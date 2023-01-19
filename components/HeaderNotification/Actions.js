import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  /* font-size: 80%; */
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
  font-size: var(--fs-smaller);
  line-height: var(--lh-small);
`

const ArrowButton = styled.button`
  pointer-events: auto;
  appearance: none;
  border: none;
  background: none;
  padding: 2rem;
  margin: 0;
  font-family: inherit;
  font-weight: inherit;
  font-style: inherit;
  color: inherit;
  cursor: pointer;
  user-select: none;
  margin-top: -2rem;
`

const Label = styled.span`
  margin-top: -2rem;
  padding: 2rem 0;
  display: inline-block;
`

export const Actions = ({ amount, label, onNextClick, onPreviousClick }) => {
  const showButtons = amount >= 2
  return (
    <Wrap>
      {showButtons && (
        <ArrowButton onClick={onPreviousClick}>{'◀'}</ArrowButton>
      )}
      <Label>{label}</Label>
      {showButtons && <ArrowButton onClick={onNextClick}>{'▶'}</ArrowButton>}
    </Wrap>
  )
}
