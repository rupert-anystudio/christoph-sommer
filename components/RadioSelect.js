import styled from 'styled-components'
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

const RadioSelect = ({
  label,
  value,
  onValueChange,
  options,
  orientation = 'vertical',
}) => {
  return (
    <Wrap>
      <Label>{label}</Label>
      <Root
        value={value}
        onValueChange={onValueChange}
        orientation={orientation}
      >
        {options.map((option) => {
          return (
            <Entry key={option.id}>
              <Item value={option.value} id={option.id}>
                <Indicator />
              </Item>
              <EntryLabel htmlFor={option.id}>{option.label}</EntryLabel>
            </Entry>
          )
        })}
      </Root>
    </Wrap>
  )
}

export default RadioSelect
