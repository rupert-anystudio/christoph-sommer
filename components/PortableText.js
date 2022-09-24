import { PortableText as PortableTextReact } from '@portabletext/react'

const PortableText = ({ value = [] }) => {
  if (!value || value.length < 1) return null
  return (
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
          blockquote: ({ children }) => <block>{children}</block>,
        },
        list: {
          bullet: ({ children }) => <ul>{children}</ul>,
        },
        // marks: {
        //   internalLink: ({ value, children }) => {
        //     const { slug, docType } = value
        //     const href = getInternalHref({ slug, docType })
        //     return (
        //       <Link href={href} passHref>
        //         <a>{children}</a>
        //       </Link>
        //     )
        //   },
        //   link: ({ value, children }) => {
        //     const { href } = value
        //     return (
        //       <a href={href} target="_blank" rel="noreferrer">
        //         {children}
        //       </a>
        //     )
        //   },
        // },
      }}
    />
  )
}

export default PortableText
