import { Children, createContext, useContext, useState } from 'react'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('Light')
  const onThemeToggle = () => {
    setTheme((prev) => (prev === 'Light' ? 'Dark' : 'Light'))
  }
  const state = {
    theme,
    onThemeToggle,
  }
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
