import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body, #__next {
    background: var(--color-bg);
    color: var(--color-txt);
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
  }
  #__next {
    position: relative;
    min-height: 100vh;
    width: 100%;
    /* display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 auto; */
  }
`

export default GlobalStyles
