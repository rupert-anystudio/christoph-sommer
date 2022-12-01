import styled from 'styled-components'
import { Small } from './Primitives'
import Section from './Section'

const Title = styled(Small).attrs({ as: 'h2' })`
  /* margin-bottom: var(--padding-card-v); */
`

const ExpandableSection = ({ title, children }) => {
  return (
    <Section>
      {/* {title && <Title>{title}</Title>} */}
      {children}
    </Section>
  )
}

export default ExpandableSection
