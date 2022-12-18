import styled from 'styled-components'

export const Text = styled.span`
  margin: 0;
  padding: 0;
`

export const Body = styled(Text)`
  font-family: var(--ff-suisse);
  font-weight: var(--fw-suisse);
  font-style: var(--fx-suisse);
  font-size: var(--fs-small);
  line-height: var(--lh-small);
  @media (min-width: 400px) {
    font-size: var(--fs-root);
    line-height: var(--lh-root);
  }
`

export const Link = styled(Text)`
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
  font-size: var(--fs-small);
  line-height: var(--lh-small);
  @media (min-width: 400px) {
    font-size: var(--fs-root);
    line-height: var(--lh-root);
  }
`

export const Input = styled(Text)`
  font-size: var(--fs-smaller);
  line-height: var(--lh-small);
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
`

export const Small = styled(Text)`
  font-size: var(--fs-smaller);
  line-height: var(--lh-small);
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
`

export const Title = styled(Text)`
  font-family: var(--ff-suisse);
  font-weight: var(--fw-suisse);
  font-style: var(--fx-suisse);
  font-size: var(--fs-large);
  line-height: var(--lh-large);
  @media (min-width: 400px) {
    font-size: var(--fs-larger);
    line-height: var(--lh-larger);
  }
  @media (min-width: 1024px) {
    font-size: var(--fs-big);
    line-height: var(--lh-big);
  }
  @media (min-width: 1680px) {
    font-size: var(--fs-bigger);
    line-height: var(--lh-bigger);
  }
`

export const SmallPill = styled(Small)`
  position: relative;
  display: inline-block;
  padding: 0.3rem 0.8em;
  border-radius: 4rem;
  white-space: pre;
`

export const SmallPillButton = styled(SmallPill).attrs({ as: 'button' })`
  background: var(--color-element-txt);
  color: var(--color-element-bg);
  appearance: none;
  border: none;
  @media (hover: hover) {
    cursor: pointer;
  }
`

export const CircleButton = styled.button`
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
