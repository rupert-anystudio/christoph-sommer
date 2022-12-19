import { createContext, useState } from 'react'

export const PortfolioContext = createContext()

export const PortfolioContextProvider = ({ children }) => {
  const [filter, setFilter] = useState('all')
  const onFilterChange = (newFilter) => {
    setFilter(newFilter)
  }
  const state = {
    filter,
    onFilterChange,
  }
  return (
    <PortfolioContext.Provider value={state}>
      {children}
    </PortfolioContext.Provider>
  )
}
