import { useCallback } from 'react'
import styled from 'styled-components'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { entryLabels, entryTypes } from '../lib/entryHelpers'
import { useFilterContext } from './FilterContext'
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
  user-select: none;
`
const Root = RadioGroupPrimitive.Root
const Entry = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
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
    border: 2px solid currentColor;
  }
  &[data-state='checked'] {
    &:after {
      border-color: var(--color-element-bg);
    }
  }
`
const Indicator = styled(RadioGroupPrimitive.Indicator)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--color-element-bg);
`
const EntryLabel = styled(Input).attrs({ as: 'label' })`
  cursor: pointer;
  ${Item}[data-state='checked'] ~ & {
    color: var(--color-element-bg);
  }
`

const FilterSelect = () => {
  const { filter, onFilterChange } = useFilterContext()
  // const [isOpen, setIsOpen] = useState(false)
  const handleValueChange = useCallback(
    (val) => {
      // console.log({ val })
      onFilterChange(val)
      // setIsOpen(false)
    },
    [onFilterChange]
  )
  // const handleFocusCapture = () => {
  //   setIsOpen(true)
  // }
  return (
    <Wrap>
      <Label>{'Filter:'}</Label>
      <Root
        value={filter}
        onValueChange={handleValueChange}
        orientation="vertical"
      >
        {entryTypes.map((type) => {
          const id = `filter-option-${type}`
          // if (!isOpen && type !== filter) return null
          return (
            <Entry key={type}>
              <Item
                value={type}
                id={id}
                // onFocusCapture={handleFocusCapture}
              >
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
