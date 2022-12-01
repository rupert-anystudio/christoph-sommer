import { createGlobalStyle } from 'styled-components'

const Colors = createGlobalStyle`
  :root {
    /* COLOR PALETTE */
    --color-white: white;
    --color-offwhite: #eeeeee;
    --color-grey: #CFCFCF;
    --color-darkgrey: #272727;
    --color-black: black;
    --color-offblack: #080808;
    --color-blue-before:#3959FF;
    --color-blue:#2040df;
    --color-blue--rgb: 57, 89, 255;
    --color-peach-before: #ffdebf;
    --color-peach: #eec8a5;
    --color-teal: #BEF5E5;
    --color-teal--rgb: 190, 245, 229;
  }
`

export default Colors
