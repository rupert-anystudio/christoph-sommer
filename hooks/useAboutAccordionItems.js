import { useMemo } from 'react'
import usePagePropsContext from './usePagePropsContext'

const useAboutAccordionItems = () => {
  const { about } = usePagePropsContext()
  const items = useMemo(() => {
    return [
      {
        key: 'missionStatement',
        label: 'Mission',
        content: about?.missionStatement,
      },
      {
        key: 'aboutText',
        label: 'Über Mich',
        content: about?.aboutText,
      },
    ]
  }, [about])
  return items
}

export default useAboutAccordionItems
