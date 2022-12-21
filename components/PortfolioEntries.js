import styled from 'styled-components'
import React, { useState } from 'react'
import PortfolioEntry from './PortfolioEntry'
import useFilteredPortfolioEntries from '../hooks/useFilteredPortfolioEntries'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

const Wrap = styled.div`
  position: relative;
  display: grid;
  grid-gap: var(--padding-portfolio);
  padding: var(--padding-portfolio);
`

const PortfolioEntries = () => {
  const entries = useFilteredPortfolioEntries()
  const [selected, setSelected] = useState(null)

  useIsomorphicLayoutEffect(() => {
    if (!selected) return
    if (entries.map((e) => e.id).includes(selected)) return
    setSelected(null)
  }, [entries, selected])

  return (
    <Wrap>
      {entries.map((entry) => (
        <PortfolioEntry
          key={entry.id}
          {...entry}
          isSelected={entry.id === selected}
          hasSelection={selected !== null}
          onSelect={() =>
            setSelected((prevId) => (prevId === entry.id ? null : entry.id))
          }
        />
      ))}
    </Wrap>
  )
}

export default PortfolioEntries
