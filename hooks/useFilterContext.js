import { useContext } from 'react'
import { FilterContext } from '../components/FilterContext'

const useFilterContext = () => useContext(FilterContext)
export default useFilterContext
