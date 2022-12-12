import styled from 'styled-components'
import { SmallPillButton } from './Primitives'

const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: var(--padding-page);
  /* transition: transform 0.34s ease-in-out;
  transform: translate3d(0, ${(p) => (p.isSelected ? '100%' : '0%')}, 0); */
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    left: -100px;
    right: -100px;
    height: 200px;
    background: var(--color-bg);
    transition: transform 0.34s ease-in-out;
    transform: translate3d(0, ${(p) => (p.isSelected ? '100%' : '0%')}, 0);
    box-shadow: 0px 0px calc(var(--item-gradientheight) / 2)
      calc(var(--item-gradientheight) / 2) var(--color-bg);
  }
`

const Button = styled.button`
  position: relative;
  color: ${(p) => (p.isSelected ? 'var(--color-txt)' : 'var(--color-bg)')};
  background: ${(p) => (p.isSelected ? 'var(--color-bg)' : 'var(--color-txt)')};
  appearance: none;
  border: 2px solid var(--color-txt);
  width: var(--circle-size);
  height: var(--circle-size);
  line-height: calc(var(--circle-size) - 4px);
  font-size: calc(var(--circle-size) * 0.5);
  border-radius: 50%;
  text-align: center;
  @media (hover: hover) {
    cursor: pointer;
  }
`

export const EntryToggle = ({ onClick, isSelected }) => {
  return (
    <Wrap isSelected={isSelected}>
      <Button onClick={onClick} isSelected={isSelected}>
        {isSelected ? '▲' : '▼'}
      </Button>
    </Wrap>
  )
}
