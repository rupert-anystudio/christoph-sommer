import styled from 'styled-components'

const Main = styled.main`
  position: relative;
  flex: 1 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: 0;
  grid-template-areas:
    'first'
    'middle'
    'last';
  @media (min-width: 400px) {
    grid-template-columns: var(--width-col-0) var(--width-col-1) 1fr;
    grid-template-areas: 'first middle last';
  }
`

export const MainFirst = styled.div`
  position: relative;
  border-bottom: var(--border);
  @media (min-width: 400px) {
    grid-area: first;
    border-bottom: none;
  }
`
export const MainFirstContent = styled.div`
  position: relative;
  @media (min-width: 400px) {
    position: sticky;
    top: var(--height-header);
    top: 0;
    padding-top: var(--height-header);
    height: calc(100vh - var(--height-header));
  }
`
export const MainMiddle = styled.div`
  position: relative;
  border-bottom: var(--border);
  @media (min-width: 400px) {
    grid-area: middle;
    border-right: var(--border);
    border-left: var(--border);
  }
`
export const MainLast = styled.div`
  position: relative;
  border-bottom: var(--border);
  @media (min-width: 400px) {
    grid-area: last;
  }
`

export default Main
