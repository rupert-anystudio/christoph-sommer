import styled from 'styled-components'
import Link from 'next/link'

const defaultElem = styled.span`
  color: currentColor;
  text-decoration: none;
`

const AnyLink = ({
  children,
  href,
  isActive = false,
  isDisabled = false,
  Elem = defaultElem,
  download,
  ...rest
}) => {
  // do not render anything if no children are provided
  if (!children) return null
  // do not render anything if no Elem is provided
  if (!Elem) return null
  // if no href is given at all, render as a span
  if (!href)
    return (
      <Elem isActive={isActive} disabled={isDisabled} {...rest}>
        {children}
      </Elem>
    )
  // if the given href is either an object or starts with a slash, it is considered an internal link
  if (
    typeof href === 'object' ||
    (typeof href === 'string' && href.slice(0, 1) === '/')
  )
    return (
      <Link href={href} passHref>
        <Elem as="a" isActive={isActive} disabled={isDisabled} {...rest}>
          {children}
        </Elem>
      </Link>
    )
  // otherwise consider link as external, adding appropriate attributes
  return (
    <Elem
      as="a"
      isActive={isActive}
      disabled={isDisabled}
      href={href}
      target="_blank"
      download={download}
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </Elem>
  )
}

export default AnyLink
