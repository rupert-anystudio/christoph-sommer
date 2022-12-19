import usePortfolioContext from './usePortfolioContext'
import usePagePropsContext from './usePagePropsContext'

const usePortfolioEntries = () => {
  const { docs = [] } = usePagePropsContext()
  const { filter = 'all' } = usePortfolioContext()
  if (filter === 'all') return docs
  return docs.filter((d) => d._type === filter)
  // return docs.map((d) => ({ ...d, isHidden: d._type !== filter }))
}

export default usePortfolioEntries
