import useThemeContext from '../hooks/useThemeContext'
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
