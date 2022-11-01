import styled from 'styled-components'

const Footer = styled.footer`
  position: relative;
  width: 100%;
  flex: 0;
  background: var(--color-bg);
  border-top: 2px solid var(--color-txt);
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
`

export default Footer
