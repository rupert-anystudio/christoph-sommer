import styled from 'styled-components'

const CardTags = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    &:not(:last-child) {
      margin-right: 0.6rem;
    }
  }
`

export default CardTags
