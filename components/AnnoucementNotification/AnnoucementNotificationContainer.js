import { useAnnoucements } from '../../hooks/useAnnoucements'
import { AnnoucementNotification } from './AnnoucementNotification'

export const AnnoucementNotificationContainer = (props) => {
  const { annoucement, amount, onNextClick } = useAnnoucements()

  if (!annoucement) return null

  return (
    <AnnoucementNotification
      {...props}
      annoucement={annoucement}
      amount={amount}
      onNextClick={onNextClick}
    />
  )
}
