import { useId } from 'react'
import { viewTypes } from '../lib/entryHelpers'
import usePortfolioContext from '../hooks/usePortfolioContext'
import RadioSelect from './RadioSelect'

const PortfolioViewSelect = () => {
  const { view, onViewChange } = usePortfolioContext()
  const uniqueId = useId()
  const options = viewTypes.map((value) => {
    const id = [uniqueId, value].join('-')
    const label = value
    return { id, label, value }
  })

  return (
    <RadioSelect
      label={'View:'}
      options={options}
      value={view}
      onValueChange={onViewChange}
    />
  )
}

export default PortfolioViewSelect
