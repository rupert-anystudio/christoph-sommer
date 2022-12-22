import React, { useEffect, useRef } from 'react'
import PortableText from './PortableText'
import { Body } from './Primitives'
import Card, {
  CardSection,
  CardTag,
  CardTags,
  CardTitle,
  CardAnchor,
  CardSections,
} from './Card'
import LinkList from './LinkList'
import PublicationList from './PublicationList'
import styled, { css } from 'styled-components'
import ObservedElementDimensions from './ObservedElementDimensions/ObservedElementDimensions'
import useObservedElementDimensions from './ObservedElementDimensions/useObservedElementDimensions'
import { useIsomorphicLayoutEffect, useSpringValue } from '@react-spring/web'
import { useTransition, animated, useSpringRef } from '@react-spring/web'

const Wrap = styled.div`
  position: relative;
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

const OverlayButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  appearance: none;
  outline: none;
  border: none;
  color: transparent;
  background: transparent;
  border-radius: 0;
  width: 100%;
  height: 100%;
  display: block;
  padding: 0;
  margin: 0;
  cursor: pointer;
  pointer-events: ${(p) => (p.isSelected ? 'none' : 'auto')};
  > span {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(calc(-1 * var(--padding-portfolio)));
    color: var(--color-bg);
    background: var(--color-txt);
    padding: 1rem;
    border-radius: 12rem;
    pointer-events: auto;
  }
`

const ScrollAnchor = styled.span`
  position: absolute;
  pointer-events: none;
  visibility: hidden;
  left: 0;
  top: calc(-1 * var(--padding-portfolio));
`
const ScrollAnchorClose = styled.span`
  position: absolute;
  pointer-events: none;
  visibility: hidden;
  left: 0;
  top: calc(-4 * var(--padding-portfolio));
`

const GradientSvg = styled.svg`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  height: auto;
  > rect {
    fill: var(--color-bg);
  }
`

const Gradient = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
  line-height: 0;
`

const OverlayGradient = (props) => {
  return (
    <GradientSvg viewBox="0 0 100 100" {...props}>
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.7" stopColor="white" stopOpacity="0" />
          <stop offset="0.99" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id="gradient-mask">
          <rect x="0" y="0" width="100" height="100" fill="url(#gradient)" />
        </mask>
      </defs>
      <rect x={0} y={0} width={100} height={100} mask="url(#gradient-mask)" />
    </GradientSvg>
  )
}

const Animated = styled(animated.div)`
  position: relative;
  overflow: hidden;
`

const PortfolioEntry = ({
  type,
  typeLabel,
  title,
  slug,
  categories,
  excerpt,
  context,
  publications,
  coAuthors,
  links,
  isFirst,
  isLast,
  id,
  isSelected,
  onSelect,
  hasSelection,
}) => {
  const wrapRef = useRef(null)
  const anchorTop = useRef(null)
  const anchorClose = useRef(null)
  const { dimensions } = useObservedElementDimensions()
  const isSelectedStore = useRef(isSelected)
  const card = dimensions?.cards?.[id]?.height
  const entry = dimensions?.entries?.[id]?.height
  useEffect(() => {
    const wasSelected = isSelectedStore.current
    isSelectedStore.current = isSelected
    if (!isSelected && wasSelected) {
      console.log('is and was')
      if (!anchorClose.current) return
      anchorClose.current.scrollIntoView(true, {
        behavior: 'auto',
        block: 'start',
        inline: 'nearest',
      })
    }
    if (isSelected && !wasSelected) {
      if (!anchorTop.current) return
      anchorTop.current.scrollIntoView(true, {
        behavior: 'auto',
        block: 'start',
        inline: 'nearest',
      })
    }
  }, [isSelected, hasSelection])

  useEffect(() => {
    console.log({ id, isSelected, card, entry })
  }, [isSelected, card, entry, id])

  // const gradient = useSpringValue('0%', {
  //   config: {
  //     friction: 30,
  //     tension: 120,
  //   },
  // })

  // const animHeight = useSpringValue(entry, {
  //   config: {
  //     friction: 30,
  //     tension: 120,
  //   },
  // })

  // useEffect(() => {
  //   if (!isSelected) {
  //     gradient.start('0%')
  //     animHeight.set(entry)
  //     return
  //   }
  //   animHeight.start(card)
  //   gradient.start('100%')
  // }, [isSelected, card, entry, animHeight, gradient])

  return (
    <Wrap isLast={isLast} isFirst={isFirst} type={type} wrapRef={wrapRef}>
      <ScrollAnchor ref={anchorTop} />
      <ScrollAnchorClose ref={anchorClose} />
      <ObservedElementDimensions observedId={id} observedGroup="entries">
        <div
          style={{
            position: 'relative',
            minHeight: 'var(--item-minheight)',
            height: isSelected ? 'auto' : 'var(--item-minheight)',
            overflow: 'hidden',
          }}
        >
          {/* <Animated style={{ height: animHeight }}> */}
          <ObservedElementDimensions observedId={id} observedGroup="cards">
            <Card
              style={{
                minHeight: 'var(--item-minheight)',
              }}
            >
              <CardAnchor id={slug} />
              <CardSections>
                <CardSection title={typeLabel}>
                  <CardTitle href={`#${slug}`}>{title}</CardTitle>
                  {categories.length > 0 && (
                    <CardTags>
                      {categories.map((category) => (
                        <CardTag key={category.key}>{category.label}</CardTag>
                      ))}
                    </CardTags>
                  )}
                </CardSection>
                {context && (
                  <CardSection title={'Kontext'}>
                    <Body>{context}</Body>
                  </CardSection>
                )}
                {excerpt && (
                  <CardSection>
                    <PortableText value={excerpt} />
                  </CardSection>
                )}
                {publications.length > 0 && (
                  <CardSection title={'Veröffentlicht in'}>
                    <PublicationList entries={publications} />
                  </CardSection>
                )}
                {coAuthors.length > 0 && (
                  <CardSection title={'Mit'}>
                    <LinkList entries={coAuthors} />
                  </CardSection>
                )}
                {links.length > 0 && (
                  <CardSection>
                    <LinkList entries={links} />
                  </CardSection>
                )}
              </CardSections>
            </Card>
          </ObservedElementDimensions>
          <Gradient>
            <OverlayGradient />
          </Gradient>
          <OverlayButton onClick={onSelect} isSelected={isSelected}>
            <span>{isSelected ? '▲' : '▼'}</span>
          </OverlayButton>
          {/* </Animated> */}
        </div>
      </ObservedElementDimensions>
    </Wrap>
  )
}

export default PortfolioEntry
