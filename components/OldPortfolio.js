import { useCallback } from 'react'
import styled, { css } from 'styled-components'
import usePortfolioEntries from '../hooks/usePortfolioEntries'
import OldPortfolioEntry from './OldPortfolioEntry'
import useAnimatedAccordion from '../hooks/useAnimatedAccordion'
import { EntryToggle } from './EntryToggle'
import EntryGradient from './EntryGradient'

const returnScrollTargetId = (key) => `entry-${key}`

const dev = (inset = 0) => css`
  &:after {
    content: '';
    position: absolute;
    top: ${inset * 5}px;
    left: ${inset * 5}px;
    right: ${inset * 5}px;
    bottom: ${inset * 5}px;
    border: 5px solid var(--color-focus);
    pointer-events: none;
  }
`

const Outro = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - var(--item-minheight));
  background: var(--color-bg);
`

const Wrap = styled.div`
  position: relative;
  width: 100%;
`

const Entries = styled.div`
  position: relative;
  max-width: 100vw;
  padding: var(--padding-portfolio);
  > *:not(:last-child) {
    margin-bottom: var(--padding-portfolio);
  }
`

const Entry = styled.div`
  position: relative;
  height: ${(p) => (!p.isSelected ? 'var(--item-minheight)' : 'auto')};
  position: relative;
  display: flex;
  overflow: visible;
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
`

const EntryHook = styled.div`
  position: absolute;
  top: calc(-1 * var(--padding-portfolio));
  left: 0px;
  display: block;
  width: 100%;
  height: 10px;
`

const EntryChild = styled.div`
  position: relative;
  display: block;
  height: auto;
  width: 100%;
`
const EntryContent = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  height: auto;
  min-height: ${(p) =>
    !p.isSelected
      ? 'var(--item-minheight)'
      : 'calc(100vh -  var(--padding-portfolio) * 2)'};
  max-height: 100%;
  background: var(--color-bg);
  color: var(--color-txt);
`

const classes = {
  entries: 'entries',
  entry: 'entry',
  entryChild: 'entry-child',
}

const OldPortfolio = () => {
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
              type={entry._type}
              isSelected={isSelected}
              // isHidden={entry.isHidden}
            >
              <EntryHook id={returnScrollTargetId(key)} />
              <EntryChild
                className={classes.entryChild}
                isSelected={isSelected}
                // onClick={onEntryClick(key)}
                // isHidden={entry.isHidden}
                // style={{
                //   height: 'auto',
                //   minHeight: !isSelected ? 'var(--item-minheight)' : '100vh',
                // }}
              >
                <EntryToggle
                  isSelected={isSelected}
                  onClick={onEntryClick(key)}
                />
                <EntryContent isSelected={isSelected}>
                  <OldPortfolioEntry {...entry} isDisabled={!isSelected} />
                </EntryContent>
                <EntryGradient isSelected={isSelected} />
              </EntryChild>
            </Entry>
          )
        })}
      </Entries>
      <Outro />
    </Wrap>
  )
}

export default OldPortfolio
