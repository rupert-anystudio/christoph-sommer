import styled from 'styled-components'

const Main = styled.main`
  position: relative;
  flex: 1;
  width: 100%;
  display: block;
  @media (min-width: 40rem) {
    display: grid;
    grid-template-columns: var(--width-col-0) var(--width-col-1) 1fr;
    gap: 0;
    grid-template-areas: 'first middle last';
  }
`

export const MainFirst = styled.div`
  position: relative;
  grid-area: first;
`
export const MainFirstContent = styled.div`
  position: sticky;
  top: var(--height-header);
  height: calc(100vh - var(--height-header));
`
export const MainMiddle = styled.div`
  position: relative;
  grid-area: middle;
  border-right: var(--width-border-bold) solid currentColor;
  border-left: var(--width-border-bold) solid currentColor;
`
export const MainLast = styled.div`
  position: relative;
  grid-area: last;
`

export default Main
