import styled from 'styled-components'

const Card = styled.div`
  &[data-cardtype='publishedText'] {
    --color-bg: var(--color-teal);
    --color-txt: var(--color-blue);
    --tag-opacity: 0.2;
  }
  &[data-cardtype='project'] {
    --color-bg: var(--color-blue);
    --color-txt: var(--color-teal);
    --tag-opacity: 0.2;
  }
  &[data-cardtype='speech'] {
    --color-bg: var(--color-grey);
    --color-txt: var(--color-black);
    --tag-opacity: 0.15;
  }
  &[data-cardtype='statement'] {
    --color-bg: var(--color-black);
    --color-txt: var(--color-teal);
    --tag-opacity: 0.2;
  }
  padding: var(--padding-card-v) var(--padding-card-h);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--color-bg);
  color: var(--color-txt);
  > * {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
`

export default Card
