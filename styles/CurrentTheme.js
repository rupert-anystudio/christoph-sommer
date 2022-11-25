import { useThemeContext } from '../components/ThemeContext'
import ThemeDark from './ThemeDark'
import ThemeLight from './ThemeLight'

const CurrentTheme = () => {
  const { theme } = useThemeContext()
  return (
    <>
      <ThemeLight />
      {theme === 'Dark' && <ThemeDark />}
    </>
  )
}

export default CurrentTheme
