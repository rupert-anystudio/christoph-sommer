import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --color-border: #a7a7a7;
    --shadow-card: 0px 0px 1.8rem 0px rgb(0 0 0 / 8%), 0.1rem 0.2rem 0.8rem rgb(0 0 0 / 22%);
    --color-bg: white;
    --color-txt: black;
    --fs-root: 1.8rem;
    --lh-root: 1.2;
    --fs-large: 2.4rem;
    --lh-large: 1.2;
  }
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background: var(--color-bg);
  }
  body {
    width: 100%;
    height: auto;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    font-size: var(--fs-root);
    line-height: var(--lh-root);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    background: var(--color-bg);
    color: var(--color-txt);
  }
`

export default GlobalStyles
