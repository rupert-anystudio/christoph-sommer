import styled from 'styled-components'
import { useAppContext } from './AppContext'
import { SmallPillButton } from './Primitives'

const ThemeToggle = () => {
  const { theme, onThemeToggle } = useAppContext()
  return (
    <SmallPillButton
      onClick={onThemeToggle}
    >{`${theme} Theme`}</SmallPillButton>
  )
}

export default ThemeToggle
