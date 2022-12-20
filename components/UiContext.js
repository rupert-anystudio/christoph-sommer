import { createContext, useState } from 'react'

export const UiContext = createContext()

export const UiContextProvider = ({ children }) => {
  const [hovered, setHovered] = useState('all')
  const onHoverStart = (value) => {
    setHovered(value)
  }

  const onHoverEnd = () => {
    setHovered(null)
  }

  const state = {
    hovered,
    onHoverStart,
    onHoverEnd,
  }

  return <UiContext.Provider value={state}>{children}</UiContext.Provider>
}
