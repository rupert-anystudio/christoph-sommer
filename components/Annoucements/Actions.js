import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  font-size: 80%;
  > * {
    margin-right: 0.5rem;
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
