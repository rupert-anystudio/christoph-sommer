import 'normalize.css'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import Annoucements from '../components/Annoucements'
import { ThemeContextProvider } from '../components/ThemeContext'
import { FilterContextProvider } from '../components/FilterContext'
import Footer from '../components/Footer'
import FooterNav from '../components/FooterNav'
import GlobalStyles from '../components/GlobalStyles'
import Header from '../components/Header'
import Logo, { LogoWrap } from '../components/Logo'
import Main from '../components/Main'
import { PagePropsContextProvider } from '../components/PagePropsContext'
// import ThemeToggle from '../components/ThemeToggle'
// import AboutSections from '../components/AboutSections'
import React from 'react'

gsap.registerPlugin(CSSPlugin)

function MyApp({ Component, pageProps }) {
  return (
    <PagePropsContextProvider pageProps={pageProps}>
      <ThemeContextProvider>
        <FilterContextProvider>
          <GlobalStyles />
          <React.StrictMode>
            <Header>
              <LogoWrap>
                <Logo />
                <Annoucements />
              </LogoWrap>
              {/* <ThemeToggle /> */}
            </Header>
            <Main>
              <Component {...pageProps} />
            </Main>
            <Footer>
              <FooterNav />
            </Footer>
          </React.StrictMode>
        </FilterContextProvider>
      </ThemeContextProvider>
    </PagePropsContextProvider>
  )
}

export default MyApp
