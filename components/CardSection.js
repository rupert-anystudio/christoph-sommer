import styled from 'styled-components'
import { Small } from './Primitives'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  border-top: 2px solid var(--color-txt);
  padding: var(--padding-card-h) 0;
`

const Title = styled(Small)`
  margin-bottom: var(--padding-card-h);
`

const CardSection = ({ children, title }) => {
  return (
    <Wrap>
      {title && <Title>{title}</Title>}
      {children}
    </Wrap>
  )
}

export default CardSection
