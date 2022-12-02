import { BiStar } from 'react-icons/bi'
import PortfolioOrder from '../../inputs/PortfolioOrder'

export default {
  title: 'Portfolio Settings',
  name: 'portfolioSettings',
  type: 'document',
  icon: BiStar,
  isSingleton: true,
  editOnly: true,
  fields: [
    {
      type: 'array',
      name: 'order',
      title: 'Order of Porfolio Documents',
      of: [{ type: 'string' }],
      inputComponent: PortfolioOrder,
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Portfolio Settings',
    }),
  },
}
