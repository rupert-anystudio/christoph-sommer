import styled from 'styled-components'

const Card = styled.div`
  /* &[data-cardtype='publishedText'] {
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
  } */
  &[data-cardtype='publishedText'] {
    --color-bg: var(--color-text-bg);
    --color-txt: var(--color-text-txt);
    --tag-opacity: 0.2;
  }
  &[data-cardtype='project'] {
    --color-bg: var(--color-project-bg);
    --color-txt: var(--color-project-txt);
    --tag-opacity: 0.2;
  }
  &[data-cardtype='speech'] {
    --color-bg: var(--color-speech-bg);
    --color-txt: var(--color-speech-txt);
    --tag-opacity: 0.15;
  }
  &[data-cardtype='statement'] {
    --color-bg: var(--color-statement-bg);
    --color-txt: var(--color-statement-txt);
    --tag-opacity: 0.2;
  }
  position: relative;
  padding: var(--padding-card-v) var(--padding-card-h);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--color-bg);
  color: var(--color-txt);
  height: 60rem;
  overflow: hidden;
  /* border-image: var(--color-bg); */
  > * {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
  @media (hover: hover) {
    /* cursor: pointer; */
  }
`

export default Card
