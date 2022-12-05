import useFilterContext from './useFilterContext'
import usePagePropsContext from './usePagePropsContext'

const usePortfolioEntries = () => {
  const { docs = [] } = usePagePropsContext()
  const { filter = 'all' } = useFilterContext()
  if (filter === 'all') return docs
  return docs.map((d) => ({ ...d, isHidden: d._type !== filter }))
}

export default usePortfolioEntries
