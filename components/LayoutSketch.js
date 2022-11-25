import styled, { css } from 'styled-components'
import { Small } from './Primitives'

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
    'Collapsibles'
    'Scrollables';
  @media (min-width: 1024px) {
    grid-template-columns: 1fr minmax(auto, 56rem);
    grid-template-rows: var(--height-header) 1fr;
    grid-template-areas:
      'Header Scrollables'
      'Collapsibles Scrollables';
  }
  @media (min-width: 1440px) {
    grid-template-columns: minmax(auto, 56rem) 1fr;
    grid-template-rows: var(--height-header) 1fr;
    grid-template-areas:
      'Header Scrollables'
      'Collapsibles Scrollables';
  }
`
const Area = styled.div``
const Element = styled.div`
  border: var(--border);
  background: var(--color-offblack);
`
const Header = styled(Element)`
  grid-area: Header;
  z-index: 100;
  @media (min-width: 1024px) {
    position: sticky;
    top: 0;
  }
`
const Collapsibles = styled(Area)`
  grid-area: Collapsibles;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  @media (min-width: 1024px) {
    grid-template-rows: calc(100vh - var(--height-header));
  }
`
const Blocks = styled(Area)`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-auto-rows: auto;
  > div:not(:last-child) {
    border-bottom: var(--border);
  }
  @media (min-width: 1024px) {
    position: sticky;
    top: var(--height-header);
  }
`
const Block = styled(Element)``
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
    /* left: 100%; */
    grid-area: Main;
  }
`
const Actions = styled(Element)`
  position: sticky;
  top: 0;
  z-index: 10;
  @media (min-width: 1440px) {
    /* left: 100%; */
    grid-area: Sidebar;
  }
`
const Footer = styled(Element)`
  @media (min-width: 1440px) {
    /* left: 100%; */
    grid-area: Footer;
    z-index: 10;
    position: sticky;
    bottom: 0;
  }
`

const LayoutSketch = ({ children }) => {
  return (
    <Container>
      <Header>
        <AreaLabel>Header</AreaLabel>
      </Header>
      <Collapsibles>
        <Blocks>
          <Block>
            <AreaLabel>Block</AreaLabel>
          </Block>
          <Block>
            <AreaLabel>Block</AreaLabel>
          </Block>
          <Block>
            <AreaLabel>Block</AreaLabel>
          </Block>
        </Blocks>
      </Collapsibles>
      <Scrollables>
        <Actions>
          <AreaLabel>Actions</AreaLabel>
        </Actions>
        <Main>
          <AreaLabel>Main</AreaLabel>
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
          <Lorem />
        </Main>
        <Footer>
          <AreaLabel>Footer</AreaLabel>
        </Footer>
      </Scrollables>
    </Container>
  )
}

export default LayoutSketch
