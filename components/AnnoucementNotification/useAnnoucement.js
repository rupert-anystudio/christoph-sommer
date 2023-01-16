import { useCallback } from 'react'
import { useState } from 'react'
import usePagePropsContext from '../../hooks/usePagePropsContext'

export const useAnnoucement = () => {
  const { annoucements = [] } = usePagePropsContext()
  const annoucementsLength = annoucements.length

  const [annoucementIndex, setAnnoucementIndex] = useState(0)

  const onNextAnnoucementClick = useCallback(() => {
    setAnnoucementIndex((i) => {
      const nextIndex = i + 1
      if (nextIndex + 1 > annoucementsLength) return 0
      return nextIndex
    })
  }, [annoucementsLength])

  const annoucement = annoucements[annoucementIndex] || null

  return {
    annoucement,
    annoucementIndex,
    annoucementsLength,
    onNextAnnoucementClick,
  }
}
