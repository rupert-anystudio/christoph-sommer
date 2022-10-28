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
