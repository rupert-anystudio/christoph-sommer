import styled, { css } from 'styled-components'
import Annoucements from './Annoucements'
import FilterSelect from './FilterSelect'
import FooterNav from './FooterNav'
import Logo from './Logo'
import usePagePropsContext from '../hooks/usePagePropsContext'
import { Small } from './Primitives'
import LandingAccordion from './LandingAccordion'
import Head from 'next/head'
// import ThemeToggle from './ThemeToggle'

const Container = styled.div`
  --height-footer: 80px;
  position: relative;
  display: grid;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
  grid-template-columns: 1fr;
  grid-template-rows: var(--height-header) auto 1fr;
  grid-template-areas:
    'Header'
    'Infos'
    'Scrollables';
  @media (min-width: 800px) {
    grid-template-columns: 5fr 5fr;
    grid-template-rows: var(--height-header) 1fr;
    grid-template-areas:
      'Header Scrollables'
      'Infos Scrollables';
  }
  @media (min-width: 1440px) {
    grid-template-columns: minmax(auto, 56rem) 1fr;
    grid-template-rows: var(--height-header) 1fr;
    grid-template-areas:
      'Header Scrollables'
      'Infos Scrollables';
  }
`
const Area = styled.div``
const Element = styled.div`
  background: var(--color-bg);
  padding: var(--padding-page);
`
const Header = styled(Element)`
  grid-area: Header;
  z-index: 100;
  border-bottom: var(--border);
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: sticky;
  top: 0; */
  /* border-right: var(--border); */
  @media (min-width: 800px) {
    position: sticky;
    top: 0;
    border-right: var(--border);
  }
  > div {
    position: relative;
  }
`
const Infos = styled(Area)`
  grid-area: Infos;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  @media (max-width: 919px) {
    border-bottom: var(--border);
  }
  @media (min-width: 800px) {
    grid-template-rows: calc(100vh - var(--height-header));
    border-right: var(--border);
  }
  > div {
    position: relative;
    /* border: 2px solid red; */
    @media (min-width: 800px) {
      position: sticky;
      top: var(--height-header);
    }
  }
`
const Scrollables = styled(Area)`
  grid-area: Scrollables;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  @media (min-width: 1440px) {
    grid-template-columns: minmax(auto, 590px) 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'Main Sidebar'
      'Main xxxxxx'
      'Main Footer';
  }
  @media (min-width: 1680px) {
    grid-template-columns: minmax(auto, 680px) 1fr;
  }
`
const Main = styled(Element)`
  padding: 0;
  @media (min-width: 1440px) {
    grid-area: Main;
    /* border-right: var(--border); */
    min-height: calc(100vh + 2px);
  }
`
const Actions = styled(Element)`
  position: relative;
  z-index: 10;
  border-bottom: var(--border);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  @media (min-width: 1440px) {
    position: sticky;
    top: 0;
    grid-area: Sidebar;
    border-bottom: none;
  }
`
const Footer = styled(Element)`
  border-top: var(--border);
  @media (min-width: 1440px) {
    grid-area: Footer;
    z-index: 10;
    position: sticky;
    bottom: 0;
    border-top: 0;
  }
`

const Layout = ({ children }) => {
  const pageProps = usePagePropsContext()
  const { layout, page } = pageProps
  return (
    <Container>
      <Head>
        <title>
          {['Über Tourismus', page?.title].filter(Boolean).join(' - ')}
        </title>
      </Head>
      <Header>
        <div>
          <Logo />
          <Annoucements />
        </div>
      </Header>
      <Infos>
        <div>
          <LandingAccordion />
        </div>
      </Infos>
      <Scrollables>
        {layout === 'landing' && (
          <Actions>
            <FilterSelect />
            <div />
            {/* <ThemeToggle />  */}
          </Actions>
        )}
        <Main>{children}</Main>
        <Footer>
          <FooterNav />
        </Footer>
      </Scrollables>
    </Container>
  )
}

export default Layout
