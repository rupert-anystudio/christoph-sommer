import styled from 'styled-components'

const Header = styled.header`
  position: relative;
  position: sticky;
  height: var(--height-header);
  flex: 0 0 var(--height-header);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: var(--border);
  color: var(--color-txt);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (min-width: 40rem) {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--width-col-0);
  }
`

export default Header
