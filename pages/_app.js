import 'normalize.css'
import Annoucements from '../components/Annoucements'
import { AppContextProvider } from '../components/AppContext'
import { FilterContextProvider } from '../components/FilterContext'
import Footer from '../components/Footer'
import FooterNav from '../components/FooterNav'
import GlobalStyles from '../components/GlobalStyles'
import Header from '../components/Header'
import HeaderLogo from '../components/HeaderLogo'
import Main from '../components/Main'
import ThemeToggle from '../components/ThemeToggle'

function MyApp({ Component, pageProps }) {
  const footerNav = [
    { key: 'imprint', href: '/impressum', label: 'Impressum' },
    { key: 'privacy', href: '/datenschutz', label: 'Datenschutz' },
  ]
  const { annoucements } = pageProps
  return (
    <AppContextProvider>
      <FilterContextProvider>
        <GlobalStyles />
        <Header>
          <HeaderLogo />
          <Annoucements annoucements={annoucements} />
          <ThemeToggle />
        </Header>
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer>
          <FooterNav nav={footerNav} />
        </Footer>
      </FilterContextProvider>
    </AppContextProvider>
  )
}

export default MyApp
