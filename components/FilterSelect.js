import styled from 'styled-components'
import { entryLabels, entryTypes } from '../lib/entryHelpers'
import { useFilterContext } from './FilterContext'

const FilterBtn = styled.button`
  background-color: ${(p) => (p.isActive ? 'red' : 'grey')};
`

const FilterSelect = () => {
  const { filter, onFilterChange } = useFilterContext()
  const handleEntryClick = (type) => (e) => {
    e.preventDefault()
    onFilterChange(type)
  }
  return (
    <div>
      <span>Filter:</span>
      <div>
        {entryTypes.map((type) => (
          <FilterBtn
            key={type}
            onClick={handleEntryClick(type)}
            isActive={filter === type}
          >
            {entryLabels[type] || type}
          </FilterBtn>
        ))}
      </div>
    </div>
  )
}

export default FilterSelect
