import styled from 'styled-components'
import { Small } from '../Primitives'

export const Entry = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding: var(--padding-page);
  padding-top: calc(var(--padding-page) / 2);
  cursor: pointer;
`

export const Label = styled(Small)`
  flex: 0;
  position: relative;
  width: 100%;
  margin: 0 0 0.8rem 0;
  display: block;
`
