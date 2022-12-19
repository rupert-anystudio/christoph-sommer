import styled, { css } from 'styled-components'
import { Small, Title } from './Primitives'

const Card = styled.article`
  ${(p) => {
    if (p.entryType === 'publishedText')
      return css`
        --color-bg: var(--color-text-bg);
        --color-txt: var(--color-text-txt);
        --tag-opacity: 0.2;
      `
    if (p.entryType === 'project')
      return css`
        --color-bg: var(--color-project-bg);
        --color-txt: var(--color-project-txt);
        --tag-opacity: 0.2;
      `
    if (p.entryType === 'speech')
      return css`
        --color-bg: var(--color-speech-bg);
        --color-txt: var(--color-speech-txt);
        --tag-opacity: 0.2;
      `
    if (p.entryType === 'statement')
      return css`
        --color-bg: var(--color-statement-bg);
        --color-txt: var(--color-statement-txt);
        --tag-opacity: 0.2;
      `
  }};
  position: relative;
  padding: var(--padding-card);
  padding-bottom: calc(var(--padding-card) * 2);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  border: var(--border-card);
  pointer-events: ${(p) => (p.isDisabled ? 'none' : 'auto')};
  background: var(--color-bg);
  color: var(--color-txt);
`

export const CardLabel = styled(Small).attrs({ as: 'p' })`
  display: block;
  margin: 0 0 0.8rem 0;
`

export const CardTitleWrap = styled(Title)`
  color: inherit;
  text-decoration: none;
  &:focus {
    outline-width: 2px;
    outline-offset: 3px;
    outline-style: solid;
    outline-color: var(--color-txt);
    border-radius: 1px;
  }
  > * {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    font-style: inherit;
  }
`

export const CardTitle = ({ href, children }) => {
  return (
    <CardTitleWrap href={href} as={href ? 'a' : 'span'}>
      <h1>{children}</h1>
    </CardTitleWrap>
  )
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 0;
  margin: 0;
  &:not(:first-child) {
    border-top: var(--border-less);
    padding-top: var(--padding-card);
    margin-top: var(--padding-card);
  }
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
