import styled from 'styled-components'
import { entryLabels, entryTypes } from '../lib/entryHelpers'
import { useFilterContext } from './FilterContext'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Input } from './Primitives'

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`
const Label = styled(Input).attrs({ as: 'label' })`
  cursor: pointer;
  margin-right: 2rem;
`
const Root = RadioGroupPrimitive.Root
const Entry = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`
const Item = styled(RadioGroupPrimitive.Item)`
  all: unset;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: none;
  margin-right: 1rem;
  cursor: pointer;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0.2rem solid var(--color-txt);
  }
`
const Indicator = styled(RadioGroupPrimitive.Indicator)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--color-txt);
`
const EntryLabel = styled(Input).attrs({ as: 'label' })`
  cursor: pointer;
`

const FilterSelect = () => {
  const { filter, onFilterChange } = useFilterContext()
  return (
    <Wrap>
      <Label>{'Filter:'}</Label>
      <Root
        value={filter}
        onValueChange={onFilterChange}
        orientation="vertical"
      >
        {entryTypes.map((type) => {
          const id = `filter-option-${type}`
          return (
            <Entry key={type}>
              <Item value={type} id={id}>
                <Indicator />
              </Item>
              <EntryLabel htmlFor={id}>{entryLabels[type]}</EntryLabel>
            </Entry>
          )
        })}
      </Root>
    </Wrap>
  )
}

export default FilterSelect
