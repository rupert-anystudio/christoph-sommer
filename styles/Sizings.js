import { createGlobalStyle } from 'styled-components'

const Sizings = createGlobalStyle`
  :root {
    /* DIMENSIONS */
    --padding-page: 2rem;
    --padding-card-h: 1rem;
    --padding-card-v: 2rem;
    --height-header: 14.3rem;
    --width-col-0: 70rem;
    --width-col-1: 70rem;
    --section-gaps: 2rem;
    @media (min-width: 40rem) {
      --height-header: 20rem;
      --padding-card-h: 3rem;
    }
    /* DEPENDEND DIMENSIONS */
    --circle-size: calc(var(--height-header) * 0.2);
  }
`

export default Sizings
