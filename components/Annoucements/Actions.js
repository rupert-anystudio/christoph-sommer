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
  > * {
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
  }
`

export const Actions = ({
  amount,
  currentIndex,
  onNextClick,
  onPreviousClick,
}) => {
  return (
    <Wrap>
      <span onClick={onPreviousClick}>{'<'}</span>
      <span>{`${currentIndex + 1} / ${amount}`}</span>
      <span onClick={onNextClick}>{'>'}</span>
    </Wrap>
  )
}
