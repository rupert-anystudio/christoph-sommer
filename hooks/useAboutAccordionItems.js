import { useMemo } from 'react'
import usePagePropsContext from './usePagePropsContext'

const useAboutAccordionItems = () => {
  const { about } = usePagePropsContext()
  const items = useMemo(() => {
    return [
      {
        key: 'missionStatement',
        label: 'über diese Website',
        content: about?.missionStatement,
      },
      {
        key: 'aboutText',
        label: 'über mich',
        content: about?.aboutText,
      },
      // {
      //   key: 'missionStatement2',
      //   label: 'über diese Website',
      //   content: about?.missionStatement,
      // },
      // {
      //   key: 'aboutText2',
      //   label: 'über mich',
      //   content: about?.aboutText,
      // },
    ]
  }, [about])
  return items
}

export default useAboutAccordionItems
