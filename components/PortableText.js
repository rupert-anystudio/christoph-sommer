import { PortableText as PortableTextReact } from '@portabletext/react'
import styled from 'styled-components'
import { CardTitle } from './Primitives'

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
  }
`

const Title = styled(CardTitle).attrs({ as: 'p' })``

const PortableText = ({ value = [] }) => {
  if (!value || value.length < 1) return null
  return (
    <Wrap>
      <PortableTextReact
        value={value}
        components={{
          // types: {
          //   inlineImage: (props) => <InlineImage {...props} />,
          // },
          block: {
            normal: ({ children }) => <p>{children}</p>,
            h1: ({ children }) => <h1>{children}</h1>,
            h2: ({ children }) => <h2>{children}</h2>,
            h3: ({ children }) => <h3>{children}</h3>,
            h4: ({ children }) => <h4>{children}</h4>,
            h5: ({ children }) => <h5>{children}</h5>,
            blockquote: ({ children }) => <block>{children}</block>,
            // custom blocks
            title: ({ children }) => <Title>{children}</Title>,
          },
          list: {
            bullet: ({ children }) => <ul>{children}</ul>,
          },
          marks: {
            externalInlineLink: ({ value, children }) => {
              const { url } = value
              return (
                <a href={url} target="_blank" rel="noreferrer">
                  {children}
                </a>
              )
            },
            // internalLink: ({ value, children }) => {
            //   const { slug, docType } = value
            //   const href = getInternalHref({ slug, docType })
            //   return (
            //     <Link href={href} passHref>
            //       <a>{children}</a>
            //     </Link>
            //   )
            // },
            // link: ({ value, children }) => {
            //   const { href } = value
            //   return (
            //     <a href={href} target="_blank" rel="noreferrer">
            //       {children}
            //     </a>
            //   )
            // },
          },
        }}
      />
    </Wrap>
  )
}

export default PortableText
