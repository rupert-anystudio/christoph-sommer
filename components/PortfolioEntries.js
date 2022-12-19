import styled from 'styled-components'
import useFilteredPortfolioEntries from '../hooks/useFilteredPortfolioEntries'
import PortfolioEntry from './PortfolioEntry'

const Wrap = styled.div`
  position: relative;
  padding: var(--padding-portfolio);
  > * {
    &:not(:last-child) {
      margin-bottom: var(--padding-portfolio);
    }
  }
`

const PortfolioEntries = () => {
  const entries = useFilteredPortfolioEntries()
  return (
    <Wrap>
      {entries.map((entry) => {
        return <PortfolioEntry key={entry.id} {...entry} />
      })}
    </Wrap>
  )
}

export default PortfolioEntries
