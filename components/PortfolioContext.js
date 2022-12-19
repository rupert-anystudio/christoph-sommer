import { createContext, useState, useCallback } from 'react'

export const PortfolioContext = createContext()

export const PortfolioContextProvider = ({ children }) => {
  const scrollToTop = useCallback(() => {
    let scroll = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 1)
    return () => {
      clearTimeout(scroll)
    }
  }, [])

  const [filter, setFilter] = useState('all')
  const onFilterChange = (newFilter) => {
    scrollToTop()
    setFilter(newFilter)
  }

  const [view, setView] = useState('expanded')
  const onViewChange = (newView) => {
    scrollToTop()
    setView(newView)
  }

  const state = {
    filter,
    onFilterChange,
    view,
    onViewChange,
  }

  return (
    <PortfolioContext.Provider value={state}>
      {children}
    </PortfolioContext.Provider>
  )
}
