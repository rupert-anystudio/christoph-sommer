import { createGlobalStyle } from 'styled-components'

const ThemeDark = createGlobalStyle`
  :root {
    /* COLORS */
    --color-bg: var(--color-black);
    --color-bg-value: var(--color-black-value);
    --color-txt: var(--color-blue);
    --color-border: var(--color-blue);
    --color-project-bg: #0b6b36;
    --color-project-txt: #ccebdc;
    /* --color-text-txt: var(--color-white);
    --color-text-bg: var(--color-black); */
    --color-text-txt: #ebcce2;
    --color-text-bg: #3b0830;
    --color-speech-bg: #0a203b;
    --color-speech-txt: #c9cee6;
    --color-statement-txt: #e6e3cb;
    --color-statement-bg: #5f3c0f;
    --color-speech-txt: #e4cceb;
    --color-speech-bg: #571c66;
    --color-element-bg: var(--color-blue);
    --color-element-txt: var(--color-black);
    --color-header-bg: var(--color-txt);
    --color-header-txt: var(--color-bg);
    --color-focus: var(--color-blue);
    /* STYLES */
    --tag-opacity: 0.3;
    --shadow-card: 0px 0px 1.8rem 0px rgb(0 0 0 / 8%), 0.1rem 0.2rem 0.8rem rgb(0 0 0 / 22%);
    --border-card: none;
    --border: 1px solid var(--color-border);
    --border-less: 1px dashed currentColor;
  }
`

export default ThemeDark
