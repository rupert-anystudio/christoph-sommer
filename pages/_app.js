import 'normalize.css'
import { AppContextProvider } from '../components/AppContext'
import GlobalStyles from '../components/GlobalStyles'

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp
