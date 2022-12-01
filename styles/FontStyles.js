import { createGlobalStyle } from 'styled-components'

const FontStyles = createGlobalStyle`
  :root {
    /* FONTSTYLE: suisse */
    --ff-suisse: 'Suisse Works', 'Times New Roman', serif;
    --fw-suisse: 400;
    --fx-suisse: normal;
    /* FONTSTYLE: inter */
    --ff-inter: 'Inter', Helvetica, Arial, sans-serif;
    --fw-inter: 500;
    --fx-inter: normal;
  }
`

export default FontStyles
