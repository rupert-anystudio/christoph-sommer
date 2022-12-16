import styled from 'styled-components'

const CardTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 0.8rem 0 -0.6rem 0;
  > * {
    margin-bottom: 0.6rem;
    &:not(:last-child) {
      margin-right: 0.6rem;
    }
  }
`

export default CardTags
