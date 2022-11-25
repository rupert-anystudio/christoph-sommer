import { useThemeContext } from '../components/ThemeContext'
import ThemeDark from './ThemeDark'
import ThemeLight from './ThemeLight'

const CurrentTheme = () => {
  const { theme } = useThemeContext()
  if (theme === 'Dark') return <ThemeDark />
  return <ThemeLight />
}

export default CurrentTheme
