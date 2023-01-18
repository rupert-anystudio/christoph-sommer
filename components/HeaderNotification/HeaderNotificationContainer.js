import { useAnnoucements } from '../../hooks/useAnnoucements'
import { HeaderNotification } from './HeaderNotification'

export const HeaderNotificationContainer = (props) => {
  const { annoucement, amount, onNextClick } = useAnnoucements()

  if (!annoucement) return null

  return (
    <HeaderNotification
      {...props}
      annoucement={annoucement}
      amount={amount}
      onNextClick={onNextClick}
    />
  )
}