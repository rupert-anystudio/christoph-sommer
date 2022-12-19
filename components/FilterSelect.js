import { useId, useCallback } from 'react'
import { getEntryTypeLabel, entryTypes } from '../lib/entryHelpers'
import usePortfolioContext from '../hooks/usePortfolioContext'
import usePagePropsContext from '../hooks/usePagePropsContext'
import RadioSelect from './RadioSelect'

const FilterSelect = () => {
  const uniqueId = useId()
  const { filter, onFilterChange } = usePortfolioContext()
  const { docs = [] } = usePagePropsContext()

  const amounts = entryTypes.reduce((acc, value) => {
    if (value === 'all') {
      acc.all = docs.length
      return acc
    }
    const matches = docs.filter((d) => d._type === value)
    acc[value] = matches.length
    return acc
  }, {})

  const options = entryTypes.map((value) => {
    const id = [uniqueId, value].join('-')
    const label = `${getEntryTypeLabel(value, 'plural')} (${amounts[value]})`
    return { id, label, value }
  })

  const handleValueChange = useCallback(
    (value) => {
      onFilterChange(value)
    },
    [onFilterChange]
  )

  return (
    <RadioSelect
      options={options}
      label={'Filter:'}
      value={filter}
      onValueChange={handleValueChange}
    />
  )
}

export default FilterSelect
