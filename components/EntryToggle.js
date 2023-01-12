import styled from 'styled-components'
import { Small, SmallPillButton, Text } from './Primitives'

const Wrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;

  > button {
    cursor: ${(p) => (!p.isSelected ? 'pointer' : 'auto')};
    pointer-events: ${(p) => (p.isSelected ? 'none' : 'auto')};
    margin: 0;
    height: 100%;
    border: none;
    appearance: none;
    background: transparent;
    color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
    overflow: hidden;
    z-index: 1;
    /* &:hover,
    &:focus,
    &:active {
      outline: none;
    } */
    > span {
      display: none;
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      padding: var(--padding-page);
      > div {
        position: relative;
        color: ${(p) => (p.isSelected ? 'var(--color-bg)' : 'var(--color-bg)')};
        background: ${(p) =>
          p.isSelected ? 'var(--color-txt)' : 'var(--color-txt)'};
        border: 2px solid var(--color-txt);
        width: var(--circle-size);
        height: var(--circle-size);
        line-height: calc(var(--circle-size) - 4px);
        font-size: calc(var(--circle-size) * 0.5);
        border-radius: 50%;
        text-align: center;
        pointer-events: auto;
        cursor: pointer;
      }
    }
  }

  @media (hover: hover) {
    > button > div {
      transition: transform 0.3s ease-in-out;
      /* transform: translate3d(0, ${(p) => (p.isSelected ? 0 : '100%')}, 0); */
      transform: translate3d(0, 100%, 0);
    }
    &:hover {
      > button > div {
        transform: translate3d(0, 0, 0);
      }
    }
  }
`

export const EntryToggle = ({ onClick, isSelected }) => {
  return (
    <Wrap isSelected={isSelected}>
      <button onClick={onClick}>
        <span>{isSelected ? 'Close' : 'Open'}</span>
        <div>
          <div>
            <span>{isSelected ? '⋯' : '⋯'}</span>
          </div>
        </div>
      </button>
    </Wrap>
  )
}
