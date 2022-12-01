import styled from 'styled-components'

const Footer = styled.footer`
  position: relative;
  width: 100%;
  flex: 0;
  background: var(--color-bg);
  border-top: var(--border);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-page);
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
    flex-direction: column;
  }
`

export default Footer
