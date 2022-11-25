import { createGlobalStyle } from 'styled-components'

const Colors = createGlobalStyle`
  :root {
    /* COLOR PALETTE */
    --color-white: white;
    --color-offwhite: #ebebeb;
    --color-grey: #CFCFCF;
    --color-black: black;
    --color-offblack: #080808;
    --color-blue:#3959FF;
    --color-blue--rgb: 57, 89, 255;
    --color-peach: #ffdebf;
    --color-teal: #BEF5E5;
    --color-teal--rgb: 190, 245, 229;
  }
`

export default Colors
