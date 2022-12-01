import styled from 'styled-components'

const CircleButton = styled.button`
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  background-color: var(--color-element-bg);
  color: var(--color-element-txt);
  line-height: var(--circle-size);
  font-size: calc(var(--circle-size) * 0.7);
  text-align: center;
  appearance: none;
  border: unset;
  cursor: pointer;
  padding: 0;
  outline: unset;
`

export default CircleButton
