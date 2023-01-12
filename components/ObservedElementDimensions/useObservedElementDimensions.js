import { useContext } from 'react'
import ObservedElementDimensionsContext from './ObservedElementDimensionsContext'
const useObservedElementDimensions = () =>
  useContext(ObservedElementDimensionsContext)
export default useObservedElementDimensions
