import styled from 'styled-components'

const Section = styled.section`
  padding: var(--padding-page);
  &:not(:first-child) {
    border-top: 2px solid currentColor;
  }
`

export default Section
