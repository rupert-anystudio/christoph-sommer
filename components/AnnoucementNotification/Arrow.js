import styled from 'styled-components'
import { forwardRef } from 'react'

const Wrap = styled.div`
  position: absolute;
  svg {
    width: 100%;
    height: 100%;
  }
  path {
    fill: var(--color-bg);
    stroke: none;
  }
`

export const Arrow = forwardRef((props, ref) => (
  <Wrap {...props} ref={ref}>
    <svg viewBox={'0 0 50 50'} width="100%" height="100%">
      <path d={`M 25,0 L 50,50 L 0,50 Z`} />
    </svg>
  </Wrap>
))

Arrow.displayName = 'Arrow'
