import { createGlobalStyle } from 'styled-components'

const Sizings = createGlobalStyle`
  :root {
    /* DIMENSIONS */
    --padding-page: 1rem;
    --padding-card-h: 1rem;
    --padding-card-v: 2rem;
    --width-col-0: 70rem;
    --width-col-1: 70rem;
    --section-gaps: 2rem;
    --height-header: 14.3rem;
    @media (min-width: 500px) {
      --padding-card-h: 2rem;
    }
    @media (min-width: 920px) {
      --padding-page: 1rem;
    }
    @media (min-width: 1024px) {
      --padding-page: 2rem;
    }
    @media (min-width: 1440px) {
      --height-header: 18.9rem;
    }
    /* DEPENDEND DIMENSIONS */
    --circle-size: calc(var(--height-header) * 0.2);
  }
`

export default Sizings