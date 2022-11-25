import { createGlobalStyle } from 'styled-components'

const FontSizes = createGlobalStyle`
  :root {
    /* FONTSIZE: small */
    --fs-small: 1.5rem;
    --lh-small: 1.3;
    /* FONTSIZE: root */
    --fs-root: 2rem;
    --lh-root: 1.3;
    /* FONTSIZE: big */
    --fs-big: 3rem;
    --lh-big: 1.3;
    /* FONTSIZE: bigger */
    --fs-bigger: 3.2rem;
    --lh-bigger: 1.28;
  }
`

export default FontSizes
