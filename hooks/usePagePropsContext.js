import { useContext } from 'react'
import { PagePropsContext } from '../components/PagePropsContext'

const usePagePropsContext = () => useContext(PagePropsContext)
export default usePagePropsContext
