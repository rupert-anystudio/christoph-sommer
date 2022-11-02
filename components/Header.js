import styled from 'styled-components'

const Header = styled.header`
  position: relative;
  position: sticky;
  flex: 0;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 2px solid var(--color-txt);
  padding: var(--padding-page);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  > * {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`

export default Header