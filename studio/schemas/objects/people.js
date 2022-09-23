export default {
  name: 'people',
  title: 'People',
  type: 'array',
  of: [
    {
      type: 'reference',
      name: 'person',
      to: [
        {
          type: 'person',
        },
      ],
    },
  ],
}
