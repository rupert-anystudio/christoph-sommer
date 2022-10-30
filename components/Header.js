import styled from 'styled-components'

const Wrap = styled.div`
  position: fixed;
  left: 0;
  z-index: 100;
  width: 100%;
  position: sticky;
  top: 0;
  background: var(--color-bg);
  border-bottom: 2px solid var(--color-border);
`

const Header = ({ children }) => {
  return <Wrap>{children}</Wrap>
}

export default Header
