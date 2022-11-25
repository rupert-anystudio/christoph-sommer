import styled from 'styled-components'
import Section from './Section'

const FilterSection = styled(Section)`
  position: sticky;
  top: calc(var(--height-header) - 1px);
  z-index: 99;
  background: var(--color-bg);
  width: 100%;
  @media (min-width: 40rem) {
    top: 0;
  }
`

export default FilterSection
