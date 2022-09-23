export default {
  name: 'links',
  type: 'array',
  title: 'Links',
  of: [
    {
      type: 'externalLink',
      name: 'externalLink',
    },
    {
      type: 'doiLink',
      name: 'doiLink',
    },
  ],
}
