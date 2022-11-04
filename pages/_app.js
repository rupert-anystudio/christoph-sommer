import 'normalize.css'
import Annoucements from '../components/Annoucements'
import { ThemeContextProvider } from '../components/ThemeContext'
import { FilterContextProvider } from '../components/FilterContext'
import Footer from '../components/Footer'
import FooterNav from '../components/FooterNav'
import GlobalStyles from '../components/GlobalStyles'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Main from '../components/Main'
import { PagePropsContextProvider } from '../components/PagePropsContext'
import ThemeToggle from '../components/ThemeToggle'

function MyApp({ Component, pageProps }) {
  return (
    <PagePropsContextProvider pageProps={pageProps}>
      <ThemeContextProvider>
        <FilterContextProvider>
          <GlobalStyles />
          <Header>
            <Logo />
            <ThemeToggle />
            <Annoucements />
          </Header>
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer>
            <FooterNav />
          </Footer>
        </FilterContextProvider>
      </ThemeContextProvider>
    </PagePropsContextProvider>
  )
}

export default MyApp
