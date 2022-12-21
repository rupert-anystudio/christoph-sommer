import { useMemo } from 'react'
import usePortfolioContext from './usePortfolioContext'
import usePortfolioEntries from './usePortfolioEntries'

const useFilteredPortfolioEntries = () => {
  const entries = usePortfolioEntries()
  const { filter } = usePortfolioContext()

  const filteredEntries = useMemo(() => {
    if (filter === 'all') return entries
    return entries.filter((e) => e.type === filter)
  }, [entries, filter])

  return filteredEntries.map((entry, i) => {
    if (i === 0) return { ...entry, isFirst: true }
    if (i === filteredEntries.length - 1) return { ...entry, isLast: true }
    return entry
  })
}

export default useFilteredPortfolioEntries
