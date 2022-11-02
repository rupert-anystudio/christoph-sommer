import { createContext, useContext } from 'react'

export const PagePropsContext = createContext()

const footerNav = [
  { key: 'imprint', href: '/impressum', label: 'Impressum' },
  { key: 'privacy', href: '/datenschutz', label: 'Datenschutz' },
]

export const PagePropsContextProvider = ({ pageProps, children }) => {
  const state = {
    ...pageProps,
    footerNav,
  }
  return (
    <PagePropsContext.Provider value={state}>
      {children}
    </PagePropsContext.Provider>
  )
}

export const usePagePropsContext = () => useContext(PagePropsContext)
