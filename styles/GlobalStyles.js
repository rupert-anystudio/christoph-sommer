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
  }
  button, input, a, select, textarea {
    &[disabled] {
      pointer-events: none;
    }
    @media (hover: hover) {
      &:hover {
      }
    }
    &:focus {
      /* outline-width: 2px;
      outline-offset: 3px;
      outline-style: solid;
      outline-color: var(--color-txt);
      border-radius: 1px; */
    }
  }
`

export default GlobalStyles
