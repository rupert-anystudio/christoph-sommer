import styled from 'styled-components'
import { Small, SmallPillButton, Text } from './Primitives'

const EntryGradient = styled.div`
  position: absolute;
  display: block;
  left: 0;
  bottom: 0;
  width: 100%;
  height: var(--item-gradientheight);
  overflow: hidden;
  pointer-events: none;
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    left: -100px;
    right: -100px;
    height: 100%;
    width: 100%;
    background: var(--color-bg);
    transition: transform 0.34s ease-in-out;
    transform: translate3d(0, ${(p) => (p.isSelected ? '100%' : '0%')}, 0);
    box-shadow: 0px 0px calc(var(--item-gradientheight) / 2)
      calc(var(--item-gradientheight) / 2) var(--color-bg);
  }
`

export default EntryGradient
