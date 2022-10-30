import 'normalize.css'
import { AppContextProvider } from '../components/AppContext'
import GlobalStyles from '../components/GlobalStyles'
import Header from '../components/Header'
import HeaderLogo from '../components/HeaderLogo'
import ThemeToggle from '../components/ThemeToggle'

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <GlobalStyles />
      <Header>
        <HeaderLogo />
        <ThemeToggle />
      </Header>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp
