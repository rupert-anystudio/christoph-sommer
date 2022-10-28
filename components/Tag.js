import styled from 'styled-components'
import { Small } from './Primitives'

const Tag = styled(Small)`
  position: relative;
  display: inline-block;
  color: var(--color-txt);
  padding: 0.3rem 0.8em;
  border-radius: 4rem;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-txt);
    opacity: var(--tag-opacity);
    border-radius: 4rem;
  }
`

export default Tag
