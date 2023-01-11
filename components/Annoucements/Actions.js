import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  font-size: 80%;
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
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
`

export const Actions = ({
  amount,
  currentIndex,
  onNextClick,
  onPreviousClick,
}) => {
  return (
    <Wrap>
      <ArrowButton onClick={onPreviousClick}>{'◀'}</ArrowButton>
      <span>{`${currentIndex + 1} / ${amount}`}</span>
      <ArrowButton onClick={onNextClick}>{'▶'}</ArrowButton>
    </Wrap>
  )
}
