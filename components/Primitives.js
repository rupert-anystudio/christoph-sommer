import styled from 'styled-components'

export const Text = styled.span`
  margin: 0;
  padding: 0;
`

export const Body = styled(Text)`
  font-size: var(--fs-root);
  line-height: var(--lh-root);
  font-family: var(--ff-suisse);
  font-weight: var(--fw-suisse);
  font-style: var(--fx-suisse);
`

export const Link = styled(Text)`
  font-size: var(--fs-root);
  line-height: var(--lh-root);
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
`

export const Input = styled(Text)`
  font-size: var(--fs-small);
  line-height: var(--lh-small);
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
`

export const Small = styled(Text)`
  font-size: var(--fs-small);
  line-height: var(--lh-small);
  font-family: var(--ff-inter);
  font-weight: var(--fw-inter);
  font-style: var(--fx-inter);
`

export const CardTitle = styled(Text)`
  font-size: var(--fs-big);
  line-height: var(--lh-big);
  font-family: var(--ff-suisse);
  font-weight: var(--fw-suisse);
  font-style: var(--fx-suisse);
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
