import styled from 'styled-components'
import { Small } from './Primitives'

const Card = styled.article`
  position: relative;
  padding: var(--padding-card-v) var(--padding-card-h);
  padding-bottom: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  border: var(--border-card);
  pointer-events: ${(p) => (p.isDisabled ? 'none' : 'auto')};
`

export const CardLabel = styled(Small).attrs({ as: 'p' })`
  display: block;
  margin: 0 0 0.8rem 0;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  border-top: var(--border-less);
  padding: var(--padding-card-h) 0 0 0;
  margin: var(--padding-card-h) 0 0 0;
`

export const CardSection = ({ children, title }) => {
  return (
    <Section>
      {title && <CardLabel as="h2">{title}</CardLabel>}
      {children}
    </Section>
  )
}

export const CardTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 0.8rem 0 -0.6rem 0;
  > * {
    margin-bottom: 0.6rem;
    &:not(:last-child) {
      margin-right: 0.6rem;
    }
  }
`

export const CardTag = styled(Small)`
  position: relative;
  display: inline-block;
  color: var(--color-txt);
  padding: 0.3rem 0.8em;
  border-radius: 4rem;
  white-space: pre;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--color-txt);
    opacity: var(--tag-opacity);
    border-radius: 4rem;
  }
`

export default Card
