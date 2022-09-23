export default {
  name: 'categories',
  title: 'Categories',
  type: 'array',
  of: [
    {
      type: 'reference',
      name: 'category',
      to: [
        {
          type: 'category',
        },
      ],
    },
  ],
}
