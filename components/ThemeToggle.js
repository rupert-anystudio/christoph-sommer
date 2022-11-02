import { useThemeContext } from './ThemeContext'
import { SmallPillButton } from './Primitives'

const ThemeToggle = () => {
  const { theme, onThemeToggle } = useThemeContext()
  return (
    <SmallPillButton
      onClick={onThemeToggle}
    >{`${theme} Theme`}</SmallPillButton>
  )
}

export default ThemeToggle
