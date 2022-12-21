import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTransition, animated, useSpringRef } from '@react-spring/web'
import useObservedElementDimensions from './ObservedElementDimensions/useObservedElementDimensions'
import usePortfolioEntries from '../hooks/usePortfolioEntries'
import usePortfolioContext from '../hooks/usePortfolioContext'
import ObservedElementDimensions from './ObservedElementDimensions/ObservedElementDimensions'
import PortfolioEntry from './PortfolioEntry'

const Wrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const AnimatedEntry = styled(animated.div)`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const EntryWrap = styled.div`
  position: relative;
  width: 100%;
  padding: var(--padding-portfolio);
`

const minHeight = 200

const shared = {
  position: 'absolute',
  left: 0,
  top: 0,
}

const AnimatedPortfolioEntries = () => {
  const entries = usePortfolioEntries()
  const { filter } = usePortfolioContext()
  const { dimensions } = useObservedElementDimensions()

  const items = entries.map((entry) => {
    const isHidden = filter !== 'all' && filter !== entry.type
    return {
      props: entry,
      id: entry.id,
      isHidden,
    }
  })

  let prevId = null
  const layout = items.reduce((acc, item, index) => {
    const prevLayout = acc[prevId]
    const maxHeight = dimensions?.portfolio?.[item.id]?.height
    const height = item.isHidden ? 0 : minHeight
    let itemLayout = {
      maxHeight,
      height,
      y: 0,
    }
    if (prevLayout) {
      itemLayout.y = prevLayout.height + prevLayout.y
    }
    acc[item.id] = itemLayout
    prevId = item.id
    return acc
  }, {})

  const wrapHeight = items.reduce((acc, item) => {
    const height = layout[item.id]?.height || 0
    return acc + height
  }, 0)

  const transitions = useTransition(
    items.filter((item) => !item.isHidden),
    {
      keys: (item) => item.id,
      // config: { tension: 50, friction: 40 },
      // exitBeforeEnter: true,
      initial: (item) => {
        const { y, height } = layout[item.id]
        return {
          ...shared,
          height,
          y,
          x: '0%',
          scale: 1,
          opacity: 1,
        }
      },
      from: (item) => {
        const { y, height } = layout[item.id]
        return {
          ...shared,
          height,
          // height: 0,
          // y: y + height / 2,
          y,
          x: '100%',
          scale: 1,
          opacity: 1,
        }
      },
      enter: (item) => {
        const { y, height } = layout[item.id]
        return {
          ...shared,
          height,
          y,
          x: '0%',
          scale: 1,
          opacity: 1,
        }
      },
      update: (item) => {
        const { y, height } = layout[item.id]
        return {
          ...shared,
          height,
          y,
          x: '0%',
          scale: 1,
          opacity: 1,
        }
      },
      leave: (item) => {
        const { y, height } = layout[item.id]
        return {
          ...shared,
          x: '-100%',
          scale: 0.3,
          opacity: 1,
          // height,
          // y,
          // config: { tension: 120, friction: 9 },
        }
      },
    }
  )

  return (
    <Wrap style={{ height: wrapHeight }}>
      {transitions((style, item) => {
        console.log({ style })
        return (
          <AnimatedEntry style={style}>
            <ObservedElementDimensions
              observedId={item.id}
              observedGroup="portfolio"
            >
              <EntryWrap>
                <PortfolioEntry {...item.props} />
              </EntryWrap>
            </ObservedElementDimensions>
          </AnimatedEntry>
        )
      })}
    </Wrap>
  )
}

export default AnimatedPortfolioEntries
