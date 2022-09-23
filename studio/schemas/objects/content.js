import React from 'react'

export default {
  title: 'Content',
  name: 'content',
  type: 'array',
  of: [
    // {
    //   type: 'inlineImage',
    // },
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        // { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        // { title: 'H5', value: 'h5' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            type: 'externalLink',
            name: 'externalLink',
            title: 'External Link',
            blockEditor: {
              icon: () => <div>🌍</div>,
            },
          },
          // {
          //   type: 'object',
          //   name: 'internalLink',
          //   title: 'Internal Link',
          //   blockEditor: {
          //     icon: () => <div>🏡</div>
          //   },
          //   fields: [
          //     {
          //       type: 'reference',
          //       name: 'document',
          //       title: 'Linked Document',
          //       to: [
          //         { type: 'aboutPage' },
          //         { type: 'space' },
          //         { type: 'caseStudy' },
          //       ]
          //     },
          //   ]
          // },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    // {
    //   type: 'image',
    //   options: { hotspot: true },
    // },
  ],
}
