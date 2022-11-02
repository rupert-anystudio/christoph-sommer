import { usePagePropsContext } from './PagePropsContext'

const Annoucements = () => {
  const { annoucements } = usePagePropsContext()
  if (!annoucements || annoucements.length < 1) return null
  return null
}

export default Annoucements
