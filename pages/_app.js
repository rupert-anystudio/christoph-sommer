import 'normalize.css'
import '../styles/fontfaces.css'
import React from 'react'
import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import { Flip } from 'gsap/Flip'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ThemeContextProvider } from '../components/ThemeContext'
import { PagePropsContextProvider } from '../components/PagePropsContext'
import { FilterContextProvider } from '../components/FilterContext'
import Colors from '../styles/Colors'
import FontStyles from '../styles/FontStyles'
import FontSizes from '../styles/FontSizes'
import Sizings from '../styles/Sizings'
import CurrentTheme from '../styles/CurrentTheme'
import GlobalStyles from '../styles/GlobalStyles'
import Layout from '../components/Layout'
import ObservedElementDimensionsProvider from '../components/ObservedElementDimensions/ObservedElementDimensionsProvider'
import { useRef } from 'react'

gsap.registerPlugin(CSSPlugin)
gsap.registerPlugin(Flip)
gsap.registerPlugin(ScrollToPlugin)

function MyApp({ pageProps }) {
  const containerRef = useRef()
  return (
    <div ref={containerRef}>
      <ThemeContextProvider>
        <Colors />
        <FontStyles />
        <FontSizes />
        <Sizings />
        <CurrentTheme />
        <GlobalStyles />
        <React.StrictMode>
          <PagePropsContextProvider value={{ ...pageProps, containerRef }}>
            <ObservedElementDimensionsProvider>
              <FilterContextProvider>
                <Layout />
              </FilterContextProvider>
            </ObservedElementDimensionsProvider>
          </PagePropsContextProvider>
        </React.StrictMode>
      </ThemeContextProvider>
    </div>
  )
}

export default MyApp
