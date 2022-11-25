import { useThemeContext } from './ThemeContext'
import CircleButton from './CircleButton'

const ThemeToggle = () => {
  const { theme, onThemeToggle } = useThemeContext()
  return (
    <CircleButton onClick={onThemeToggle}>
      {theme === 'Dark' ? '☼' : '☾'}
    </CircleButton>
  )
}

export default ThemeToggle
