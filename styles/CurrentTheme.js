import useThemeContext from '../hooks/useThemeContext'
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
