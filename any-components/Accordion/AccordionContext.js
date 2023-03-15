import { useContext } from 'react'
import { createContext } from 'react'

export const AccordionContext = createContext({})

export const useAccordionContext = () => useContext(AccordionContext)
