import useThemeContext from '../hooks/useThemeContext'
import { CircleButton } from './Primitives'

const ThemeToggle = () => {
  const { theme, onThemeToggle } = useThemeContext()
  return (
    <CircleButton onClick={onThemeToggle}>
      {theme === 'Dark' ? '☼' : '☾'}
    </CircleButton>
  )
}

export default ThemeToggle
