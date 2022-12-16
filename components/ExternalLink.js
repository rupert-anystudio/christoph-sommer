import React from 'react'
import styled, { css } from 'styled-components'
import AnyLink from './AnyLink'

const LinkElem = styled.span`
  position: relative;
  color: var(--color-txt);
  text-decoration: none;
  display: inline;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  font-style: inherit;
  font-family: inherit;
  pointer-events: auto;
  &[disabled] {
    /* outline: 4px solid green; */
  }
  > span,
  > i {
    display: inline-block;
    position: relative;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    font-style: inherit;
    font-family: inherit;
    white-space: pre;
  }
  > i {
    padding-right: 0.2em;
  }
  ${(p) =>
    !p.isStatic &&
    css`
      > span,
      > i {
        &:before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: none;
          border-bottom: 1px dashed currentColor;
        }
      }
      @media (hover: hover) {
        cursor: pointer;
        &:hover {
          > span,
          > i {
            &:before {
              border-bottom: 2px solid currentColor;
            }
          }
        }
      }
      &:focus {
        outline-width: 2px;
        outline-offset: 3px;
        outline-style: solid;
        outline-color: var(--color-txt);
        border-radius: 1px;
      }
  }`}
`

const ExternalLink = ({
  children,
  href,
  staticIcon,
  activeIcon,
  isDisabled,
}) => {
  const tabIndex = isDisabled ? -1 : 0
  const label = React.Children.map(children, (c, k) => {
    if (typeof c === 'string') {
      const words = c.split(' ')
      return words.map((s, si) => (
        <span key={si}>{`${s}${si < words.length - 1 ? ' ' : ''}`}</span>
      ))
    }
    return c
  })
  if (!href)
    return (
      <LinkElem isStatic>
        {staticIcon && <i>{staticIcon}</i>}
        {label}
      </LinkElem>
    )
  return (
    <AnyLink
      href={href}
      Elem={LinkElem}
      tabIndex={tabIndex}
      // disabled={isDisabled}
    >
      {activeIcon && <i>{activeIcon}</i>}
      {label}
    </AnyLink>
  )
}

export default ExternalLink
