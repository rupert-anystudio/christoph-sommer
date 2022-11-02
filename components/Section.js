import styled from 'styled-components'

const Section = styled.section`
  padding: var(--padding-page);
  &:not(:last-child) {
    border-bottom: 2px solid currentColor;
  }
`

export default Section
