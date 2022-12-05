import { useCallback } from 'react'
import styled, { css } from 'styled-components'
import usePortfolioEntries from '../hooks/usePortfolioEntries'
import PortfolioEntry from './PortfolioEntry'
import useAnimatedAccordion from '../hooks/useAnimatedAccordion'

const returnScrollTargetId = (key) => `entry-${key}`

const dev = (inset = 0) => css`
  &:after {
    content: '';
    position: absolute;
    top: ${inset * 5}px;
    left: ${inset * 5}px;
    right: ${inset * 5}px;
    bottom: ${inset * 5}px;
    border: 5px solid var(--color-dev);
    pointer-events: none;
  }
`

const Outro = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - var(--item-minheight));
  background: var(--color-bg);
  /* border-top: var(--border); */
`

const Wrap = styled.div`
  position: relative;
  --item-minheight: 500px;
  --item-gradientheight: 200px;
`

const Entries = styled.div`
  position: relative;
`

const Entry = styled.div`
  --color-dev: teal;
  position: relative;
  height: ${(p) => (!p.isSelected ? 'var(--item-minheight)' : 'auto')};
  padding: 0 var(--padding-page);
  /* padding: ${(p) => (!p.isSelected ? '0 var(--padding-page)' : '0')}; */
  position: relative;
  margin-top: var(--padding-page);
  &:not(:first-child) {
  }
  &:nth-child(odd) {
    --color-dev: purple;
  }
  ${(p) => {
    if (p.type === 'publishedText')
      return css`
        --color-bg: var(--color-text-bg);
        --color-txt: var(--color-text-txt);
        --tag-opacity: 0.2;
      `
    if (p.type === 'project')
      return css`
        --color-bg: var(--color-project-bg);
        --color-txt: var(--color-project-txt);
        --tag-opacity: 0.2;
      `
    if (p.type === 'speech')
      return css`
        --color-bg: var(--color-speech-bg);
        --color-txt: var(--color-speech-txt);
        --tag-opacity: 0.2;
      `
    if (p.type === 'statement')
      return css`
        --color-bg: var(--color-statement-bg);
        --color-txt: var(--color-statement-txt);
        --tag-opacity: 0.2;
      `
  }};
  overflow: visible;
`

const EntryChild = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  height: auto;
  min-height: ${(p) => (!p.isSelected ? 'var(--item-minheight)' : '100vh')};
  max-height: 100%;
  background: var(--color-bg);
  color: var(--color-txt);
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: -100px;
    right: -100px;
    height: 200px;
    background: var(--color-bg);
    transition: transform 0.34s ease-in-out;
    transform: translate3d(0, ${(p) => (p.isSelected ? '100%' : '0%')}, 0);
    box-shadow: 0px 0px calc(var(--item-gradientheight) / 2)
      calc(var(--item-gradientheight) / 2) var(--color-bg);
  }
`

// const BottomActions = styled.div`
//   position: absolute;
//   bottom: 0;
//   right: var(--padding-page);
//   left: var(--padding-page);
//   height: auto;
//   > * {
//     position: sticky;
//     bottom: 0;
//     top: unset;
//   }
// `

const classes = {
  entries: 'entries',
  entry: 'entry',
  entryChild: 'entry-child',
}

const Portfolio = () => {
  const entries = usePortfolioEntries()
  const { rootRef, value, onValueChange } = useAnimatedAccordion({
    returnScrollTargetId,
    classes,
  })

  const onEntryClick = useCallback(
    (val) => (e) => {
      e.preventDefault()
      onValueChange(val)
    },
    [onValueChange]
  )

  return (
    <Wrap ref={rootRef}>
      <Entries className={classes.entries}>
        {entries.map((entry) => {
          const key = entry._id
          const isSelected = key === value
          return (
            <Entry
              key={key}
              className={classes.entry}
              id={returnScrollTargetId(key)}
              type={entry._type}
              isSelected={isSelected}
              isHidden={entry.isHidden}
            >
              <EntryChild
                className={classes.entryChild}
                isSelected={isSelected}
                onClick={onEntryClick(key)}
                isHidden={entry.isHidden}
                // style={{
                //   height: 'auto',
                //   minHeight: !isSelected ? 'var(--item-minheight)' : '100vh',
                // }}
              >
                <PortfolioEntry {...entry} />
              </EntryChild>
              {/* <BottomActions>
                <button>{'...'}</button>
              </BottomActions> */}
            </Entry>
          )
        })}
      </Entries>
      <Outro />
    </Wrap>
  )
}

export default Portfolio
