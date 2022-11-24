import styled from 'styled-components'

const Section = styled.section`
  padding: var(--padding-page);
  &:not(:last-child) {
    border-bottom: var(--width-border-bold) solid currentColor;
  }
`

export default Section
