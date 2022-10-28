import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    
    /* DIMENSIONS */
    --padding-page: 2rem;
    --padding-card-h: 1rem;
    --padding-card-v: 2rem;

    /* COLOR PALETTE */
    --color-white: white;
    --color-offwhite: #f9f9f9;
    --color-grey: #CFCFCF;
    --color-black: black;
    --color-blue:#3959FF;
    --color-teal: #BEF5E5;

    /* DEFAULT THEME */
    --color-border: var(--color-grey);
    --color-bg: var(--color-white);
    --color-txt: var(--color-blue);
    /* --color-project-bg: var(--color-blue);
    --color-project-txt: var(--color-teal);
    --color-text-bg: var(--color-teal);
    --color-text-txt: var(--color-blue);
    --color-statement-bg: var(--color-grey);
    --color-statement-txt: var(--color-black);
    --color-speech-bg: var(--color-black);
    --color-speech-txt: var(--color-teal); */

    /* STYLE PALETTE^*/
    --tag-opacity: 0.3;
    --shadow-card: 0px 0px 1.8rem 0px rgb(0 0 0 / 8%), 0.1rem 0.2rem 0.8rem rgb(0 0 0 / 22%);

    /* FONTSTYLE: suisse */
    --ff-suisse: 'Suisse Works', 'Times New Roman', serif;
    --fw-suisse: 400;
    --fx-suisse: normal;

    /* FONTSTYLE: inter */
    --ff-inter: 'Inter', Helvetica, Arial, sans-serif;
    --fw-inter: 500;
    --fx-inter: normal;

    /* FONTSIZE: small */
    --fs-small: 1.5rem;
    --lh-small: 1.3;

    /* FONTSIZE: root */
    --fs-root: 2rem;
    --lh-root: 1.3;

    /* FONTSIZE: big */
    --fs-big: 3rem;
    --lh-big: 1.3;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body, #__next {
    background: var(--color-bg);
  }
  html {
    width: 100%;
    font-size: 62.5%;
    padding: 0;
    margin: 0;
    /* scroll-behavior: smooth; */
  }
  body {
    width: 100%;
    height: auto;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    font-family: var(--ff-suisse);
    font-style: var(--fx-suisse);
    font-weight: var(--fw-suisse);
    font-size: var(--fs-root);
    line-height: var(--lh-root);
    background: var(--color-bg);
    color: var(--color-txt);
  }
  #__next {
    position: relative;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 auto;
  }
`

export default GlobalStyles
