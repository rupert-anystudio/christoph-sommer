import styled, { css } from 'styled-components'
import Annoucements from './Annoucements'
import FilterSelect from './FilterSelect'
import FooterNav from './FooterNav'
import InfoAccordion from './InfoAccordionContainer'
import Logo from './Logo'
import usePagePropsContext from '../hooks/usePagePropsContext'
import { Small } from './Primitives'
import ThemeToggle from './ThemeToggle'
import LandingAccordion from './LandingAccordion'

const AreaLabel = styled.div`
  position: relative;
  top: unset;
  width: 100%;
  padding: var(--padding-page);
`

const Lorem = styled(Small)`
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  padding: 0 var(--padding-page);
  margin-bottom: var(--padding-page);
  &:before {
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
  }
`

const Container = styled.div`
  --height-footer: 80px;
  position: relative;
  display: grid;
  width: 100%;
  min-height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: var(--height-header) auto 1fr;
  grid-template-areas:
    'Header'
    'Infos'
    'Scrollables';
  @media (min-width: 920px) {
    grid-template-columns: 4fr 5fr;
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
  @media (min-width: 920px) {
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
  @media (min-width: 920px) {
    grid-template-rows: calc(100vh - var(--height-header));
    border-right: var(--border);
  }
  > div {
    position: relative;
    /* border: 2px solid red; */
    @media (min-width: 920px) {
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
    grid-template-columns: minmax(auto, 56rem) 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'Main Sidebar'
      'Main xxxxxx'
      'Main Footer';
  }
`
const Main = styled(Element)`
  @media (min-width: 1440px) {
    grid-area: Main;
    /* border-right: var(--border); */
    min-height: calc(100vh + 2px);
  }
`
const Actions = styled(Element)`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: var(--border);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  @media (min-width: 1440px) {
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
  const { layout } = pageProps
  return (
    <Container>
      <Header>
        <div>
          <Logo />
          <Annoucements />
        </div>
      </Header>
      <Infos>
        <div>{layout === 'landing' && <LandingAccordion />}</div>
      </Infos>
      <Scrollables>
        {/* <Actions>
          {layout === 'landing' && <FilterSelect />}
          <div />
          <ThemeToggle />
        </Actions> */}
        <Main>{children}</Main>
        <Footer>
          <FooterNav />
        </Footer>
      </Scrollables>
    </Container>
  )
}

export default Layout
