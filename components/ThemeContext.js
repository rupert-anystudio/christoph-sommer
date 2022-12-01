import { createContext, useState } from 'react'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('Dark')
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
  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
}
