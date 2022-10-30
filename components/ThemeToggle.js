import styled from 'styled-components'
import { useAppContext } from './AppContext'
import { SmallPill } from './Primitives'

const Wrap = styled.div`
  padding: var(--padding-page);
`

const Toggle = styled(SmallPill).attrs({ as: 'button' })`
  background: var(--color-txt);
  color: var(--color-bg);
  appearance: none;
  border: none;
  @media (hover: hover) {
    cursor: pointer;
  }
`

const ThemeToggle = () => {
  const { theme, onThemeToggle } = useAppContext()
  return (
    <Wrap>
      <Toggle onClick={onThemeToggle}>{`${theme} Theme`}</Toggle>
    </Wrap>
  )
}

export default ThemeToggle
