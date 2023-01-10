import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  outline: 1px solid red;
  > * {
    margin-right: 1rem;
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
      <button onClick={onPreviousClick}>{'<'}</button>
      <span>{`${currentIndex + 1} / ${amount}`}</span>
      <button onClick={onNextClick}>{'>'}</button>
    </Wrap>
  )
}
