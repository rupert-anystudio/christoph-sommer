import { useTransition, animated } from '@react-spring/web'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import usePortfolioContext from '../hooks/usePortfolioContext'
import usePortfolioEntries from '../hooks/usePortfolioEntries'
import PortfolioEntry from './PortfolioEntry'
import useUiContext from '../hooks/useUiContext'
import useObservedElementDimensions from './ObservedElementDimensions/useObservedElementDimensions'
import ObservedElementDimensions from './ObservedElementDimensions/ObservedElementDimensions'

const Transitions = styled.div`
  position: relative;
  width: 100%;
`

const EntryTransition = styled(animated.div)`
  position: relative;
  display: block;
  height: auto;
`

const AnimatedEntries = ({ entries, children }) => {
  const rootRef = useRef(null)
  const transitionRefs = useRef({})
  const { hovered, onHoverStart, onHoverEnd } = useUiContext()

  const transitions = useTransition(
    entries.map((entry) => ({
      ...entry,
      isHovered: entry.id === hovered,
    })),
    {
      keys: (e) => e.id,
      from: {
        opacity: 0,
        height: 0,
      },
      enter: (item, index) => ({
        opacity: 1,
        height: item.isHovered ? 420 : 300,
      }),
      update: (item, index) => {
        return {
          opacity: 1,
          height: item.isHovered ? 320 : 300,
        }
      },
      leave: {
        opacity: 0,
        height: 0,
      },
    }
  )

  useIsomorphicLayoutEffect(() => {
    // console.log('mount')
  }, [])

  useEffect(() => {
    // console.log('paint')
  }, [])

  useEffect(() => {
    // console.log('entries', entries)
  }, [entries])

  useEffect(() => {
    // console.log('transitions', transitions)
  }, [transitions])

  useEffect(() => {
    console.log('hovered', hovered)
  }, [hovered])

  return (
    <Transitions ref={rootRef}>
      {transitions((style, entry) => (
        <EntryTransition
          style={style}
          ref={(c) => (transitionRefs.current[entry.id] = c)}
        >
          {children(entry)}
        </EntryTransition>
      ))}
    </Transitions>
  )
}

const Wrap = styled.div`
  position: relative;
`

const useFilteredPortfolioEntries = () => {
  const entries = usePortfolioEntries()
  const { filter } = usePortfolioContext()
  return useMemo(() => {
    if (filter === 'all') return entries
    return entries.filter((e) => e.type === filter)
  }, [entries, filter])
}

const PortfolioEntries = () => {
  const entries = useFilteredPortfolioEntries()
  const { dimensions } = useObservedElementDimensions()

  useEffect(() => {
    console.log({ dimensions })
  }, [dimensions])

  return (
    <Wrap>
      {entries.map((entry) => (
        <React.Fragment key={entry.id}>
          <ObservedElementDimensions
            observedId={entry.id}
            observedGroup="portfolio"
          >
            <PortfolioEntry {...entry} />
          </ObservedElementDimensions>
        </React.Fragment>
      ))}
      {/* <AnimatedEntries entries={filteredEntries}>
        {(entry) => <PortfolioEntry {...entry} />}
      </AnimatedEntries> */}
    </Wrap>
  )
}

export default PortfolioEntries
