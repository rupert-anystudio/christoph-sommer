import { createGlobalStyle } from 'styled-components'

const ThemeLight = createGlobalStyle`
  :root {
    /* COLORS */
    --color-bg: var(--color-offwhite);
    --color-bg-value: var(--color-offwhite-value);
    --color-txt: var(--color-blue);
    --color-border: var(--color-blue);
    --color-project-bg: var(--color-blue);
    --color-project-txt: var(--color-teal);
    --color-text-bg: var(--color-peach);
    --color-text-txt: var(--color-blue);
    --color-statement-bg: var(--color-grey);
    --color-statement-txt: var(--color-black);
    --color-speech-bg: var(--color-black);
    --color-speech-txt: var(--color-teal);
    --color-element-bg: var(--color-blue);
    --color-element-txt: var(--color-white);
    --color-header-bg: var(--color-txt);
    --color-header-txt: var(--color-bg);
    --color-focus: var(--color-blue);
    /* STYLES */
    --tag-opacity: 0.3;
    --shadow-card: 0px 0px 1.8rem 0px rgb(0 0 0 / 8%), 0.1rem 0.2rem 0.8rem rgb(0 0 0 / 22%);
    --border-card: none;
    --border: 2px solid var(--color-border);
    --border-less: 1px dashed currentColor;
  }
`

export default ThemeLight
