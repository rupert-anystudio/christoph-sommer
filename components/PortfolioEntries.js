import styled from 'styled-components'
import useFilteredPortfolioEntries from '../hooks/useFilteredPortfolioEntries'
import usePortfolioContext from '../hooks/usePortfolioContext'
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
  const { view } = usePortfolioContext()
  return (
    <Wrap>
      {entries.map((entry) => {
        return (
          <PortfolioEntry
            key={entry.id}
            renderFull={view === 'expanded'}
            {...entry}
          />
        )
      })}
    </Wrap>
  )
}

export default PortfolioEntries
