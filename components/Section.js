import styled from 'styled-components'

const Section = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: var(--section-gaps);
  padding: var(--padding-page);
  &:not(:last-child) {
    border-bottom: var(--border);
  }
  /* &:after {
    content: '';
    pointer-events: none;
    box-shadow: inset 0px 0px 120px 80px var(--color-bg);
    transition: box-shadow 0.4s ease-in;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  @media (hover: hover) {
    &:hover {
      &:after {
        transition: box-shadow 0.22s ease-out;
        box-shadow: inset 0px 0px 120px 0px var(--color-bg);
      }
    }
  } */
`

export default Section
