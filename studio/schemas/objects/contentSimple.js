import React from 'react'

const TitleBlock = (props) => (
  <p
    style={{
      fontFamily: 'Garamond',
      fontSize: '1.8em',
      margin: '0.2em 0',
    }}
  >
    {props.children}
  </p>
)

export default {
  title: 'Content',
  name: 'contentSimple',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Title', value: 'title', blockEditor: { render: TitleBlock } },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          // { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            type: 'externalInlineLink',
            name: 'externalInlineLink',
            title: 'External Link',
            blockEditor: {
              icon: () => <div>🌍</div>,
            },
          },
        ],
      },
    },
  ],
}
