import { useCallback } from 'react'
import { useState } from 'react'
import usePagePropsContext from '../../hooks/usePagePropsContext'

export const useAnnoucements = () => {
  const { annoucements = [] } = usePagePropsContext()
  const amount = annoucements.length

  const [currentIndex, setCurrentIndex] = useState(0)

  const onNextClick = useCallback(() => {
    setCurrentIndex((i) => {
      const nextIndex = i + 1
      if (nextIndex + 1 > amount) return 0
      return nextIndex
    })
  }, [amount])

  const annoucement = annoucements[currentIndex] || null

  return {
    annoucement,
    amount,
    onNextClick,
  }
}
