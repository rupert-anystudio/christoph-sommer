import { createContext, useContext, useEffect, useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('Light')
  const onThemeToggle = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'Light' ? 'Dark' : 'Light'
      localStorage.setItem('theme', nextTheme)
      return nextTheme
    })
  }
  useIsomorphicLayoutEffect(() => {
    const storedValue = localStorage.getItem('theme')
    if (storedValue) {
      setTheme(storedValue)
    }
  }, [])
  const state = {
    theme,
    onThemeToggle,
  }
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
