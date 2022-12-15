import styled from 'styled-components'
import { Small } from './Primitives'

const Label = styled(Small).attrs({ as: 'p' })`
  display: block;
  margin: 0 0 0.8rem 0;
`

const CardLabel = ({ children }) => {
  if (!children) return null
  return <Label>{children}</Label>
}

export default CardLabel
