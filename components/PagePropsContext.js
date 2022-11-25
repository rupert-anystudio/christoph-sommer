import { createContext, useContext } from 'react'

export const PagePropsContext = createContext()

const footerNav = [
  { key: 'imprint', href: '/impressum', label: 'Impressum' },
  { key: 'privacy', href: '/datenschutz', label: 'Datenschutz' },
]

export const PagePropsContextProvider = ({ value, children }) => {
  const state = {
    ...value,
    footerNav,
  }
  return (
    <PagePropsContext.Provider value={state}>
      {children}
    </PagePropsContext.Provider>
  )
}

export const usePagePropsContext = () => useContext(PagePropsContext)
