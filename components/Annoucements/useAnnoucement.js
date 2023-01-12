import { useState } from 'react'
import { useCallback } from 'react'
import usePagePropsContext from '../../hooks/usePagePropsContext'

export const useAnnoucement = (initialIndex = 0) => {
  const pageProps = usePagePropsContext()
  const annoucements = pageProps?.annoucements ?? []
  const amount = annoucements.length

  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const changeIndex = useCallback(
    (offset) => {
      const targetIndex = currentIndex + offset
      const lastIndex = amount - 1
      if (targetIndex < 0) return setCurrentIndex(lastIndex)
      if (targetIndex > lastIndex) return setCurrentIndex(0)
      setCurrentIndex(targetIndex)
    },
    [currentIndex, amount]
  )

  const onNextClick = useCallback(() => {
    // console.log('onNextClick')
    changeIndex(1)
  }, [changeIndex])

  const onPreviousClick = useCallback(() => {
    // console.log('onPreviousClick')
    changeIndex(-1)
  }, [changeIndex])

  const annoucement = annoucements[currentIndex] || {}

  return {
    annoucement,
    amount,
    currentIndex,
    onNextClick,
    onPreviousClick,
  }
}
