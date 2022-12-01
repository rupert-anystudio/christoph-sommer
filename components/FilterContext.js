import { createContext, useContext, useState } from 'react'

export const FilterContext = createContext()

export const FilterContextProvider = ({ children }) => {
  const [filter, setFilter] = useState('all')
  const onFilterChange = (newFilter) => {
    setFilter(newFilter)
  }
  const state = {
    filter,
    onFilterChange,
  }
  return (
    <FilterContext.Provider value={state}>{children}</FilterContext.Provider>
  )
}
