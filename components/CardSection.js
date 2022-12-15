import styled from 'styled-components'
import { Small } from './Primitives'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  border-top: var(--border-less);
  padding: var(--padding-card-h) 0 0 0;
  margin: var(--padding-card-h) 0 0 0;
`

const Title = styled(Small).attrs({ as: 'h2' })`
  /* margin-bottom: var(--padding-card-h); */
  margin-bottom: 0.8rem;
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
