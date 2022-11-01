import 'normalize.css'
import { AppContextProvider } from '../components/AppContext'
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
  return (
    <AppContextProvider>
      <GlobalStyles />
      <Header>
        <HeaderLogo />
        <ThemeToggle />
      </Header>
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer>
        <FooterNav nav={footerNav} />
      </Footer>
    </AppContextProvider>
  )
}

export default MyApp
