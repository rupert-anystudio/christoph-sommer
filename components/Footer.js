import styled from 'styled-components'

const Footer = styled.footer`
  position: relative;
  width: 100%;
  flex: 0;
  background: var(--color-bg);
  border-top: var(--width-border-bold) solid var(--color-txt);
  padding: 2rem var(--padding-page) 4rem var(--padding-page);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
  @media (min-width: 40rem) {
    position: fixed;
    bottom: 0;
    right: 0;
    width: calc(100% - var(--width-col-0) - var(--width-col-1));
  }
`

export default Footer
