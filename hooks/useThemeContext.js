import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext'

const useThemeContext = () => useContext(ThemeContext)
export default useThemeContext
