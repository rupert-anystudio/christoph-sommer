import React from 'react'

export default {
  title: 'Content',
  name: 'contentSimple',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
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
