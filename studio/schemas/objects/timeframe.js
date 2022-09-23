export default {
  name: 'timeframe',
  title: 'Timeframe',
  type: 'object',
  fields: [
    {
      type: 'date',
      name: 'start',
      title: 'Start Date',
      validation: (Rule) => Rule.required(),
    },
    {
      type: 'date',
      name: 'end',
      title: 'End Date',
      validation: (Rule) => Rule.min(Rule.valueOfField('start')),
    },
  ],
}
