import { createGlobalStyle } from 'styled-components'

const FontSizes = createGlobalStyle`
  :root {
    /* FONTSIZE: smaller */
    --fs-smaller: 1.5rem;
    --lh-smaller: 1.3;
    /* FONTSIZE: small */
    --fs-small: 1.8rem;
    --lh-small: 1.3;
    /* FONTSIZE: root */
    --fs-root: 2rem;
    --lh-root: 1.3;
    /* FONTSIZE: large */
    --fs-large: 2.2rem;
    --lh-large: 1.3;
    /* FONTSIZE: larger */
    --fs-larger: 2.6rem;
    --lh-larger: 1.3;
    /* FONTSIZE: big */
    --fs-big: 3rem;
    --lh-big: 1.3;
    /* FONTSIZE: bigger */
    --fs-bigger: 3.6rem;
    --lh-bigger: 1.25;
  }
`

export default FontSizes
