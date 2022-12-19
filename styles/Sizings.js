import { createGlobalStyle } from 'styled-components'

const Sizings = createGlobalStyle`
  :root {
    /* DIMENSIONS */
    --padding-page: 1rem;
    --padding-portfolio: 0;
    --padding-card: 2rem;
    --width-col-0: 70rem;
    --width-col-1: 70rem;
    --section-gaps: 2rem;
    --height-header: 14.3rem;
    --item-minheight: 65vh;
    --item-gradientheight: 220px;
    @media (min-width: 360px) {
      --padding-page: 2rem;
      --padding-portfolio: 1rem;
    }
    @media (min-width: 400px) {
    }
    @media (min-width: 800px) {
    }
    @media (min-width: 1024px) {
      --padding-portfolio: 2rem;
    }
    @media (min-width: 1440px) {
      --height-header: 18.9rem;
    }
    @media (min-width: 1680px) {
    }
    /* DEPENDEND DIMENSIONS */
    --circle-size: calc(var(--height-header) * 0.2);
  }
`

export default Sizings
