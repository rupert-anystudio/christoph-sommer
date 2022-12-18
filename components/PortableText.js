import { PortableText as PortableTextReact } from '@portabletext/react'
import styled from 'styled-components'
import ExternalLink from './ExternalLink'
import { Title } from './Primitives'

const Wrap = styled.div`
  position: relative;
  display: block;
  max-width: 100%;
  > *:first-child {
    margin-top: 0;
  }
  > *:last-child {
    margin-bottom: 0;
  }
  a {
    color: currentColor;
    pointer-events: 'auto';
  }
  button {
    pointer-events: 'auto';
  }
`

const PortableText = ({ value = [], isDisabled }) => {
  if (!value || value.length < 1) return null
  return (
    <Wrap>
      <PortableTextReact
        value={value}
        components={{
          block: {
            normal: ({ children }) => <p>{children}</p>,
            h1: ({ children }) => <h1>{children}</h1>,
            h2: ({ children }) => <h2>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,
            h4: ({ children }) => <h4>{children}</h4>,
            h5: ({ children }) => <h5>{children}</h5>,
            blockquote: ({ children }) => <block>{children}</block>,
            // custom blocks
            title: ({ children }) => <Title as="p">{children}</Title>,
          },
          list: {
            bullet: ({ children }) => <ul>{children}</ul>,
          },
          marks: {
            externalInlineLink: ({ value, children }) => {
              const { url } = value
              return (
                <ExternalLink href={url} isDisabled={isDisabled} activeIcon="↗">
                  {children}
                </ExternalLink>
              )
            },
          },
        }}
      />
    </Wrap>
  )
}

export default PortableText
