import { useCallback, useState } from 'react'
import usePagePropsContext from './usePagePropsContext'

function returnBlocks(about) {
  return [
    {
      value: 'missionStatement',
      label: 'Mission',
      content: about?.missionStatement,
    },
    {
      value: 'aboutText',
      label: 'Über Mich',
      content: about?.aboutText,
    },
    {
      value: 'nochMehr',
      label: 'Nochmehr',
      content: about?.aboutText,
    },
  ]
}

const useInfoAccordion = (options = {}) => {
  const { type = 'single', collapsible = true } = options
  const { about } = usePagePropsContext()
  const blocks = returnBlocks(about)
  const [value, setValue] = useState(blocks[0].value)
  const onValueChange = useCallback((value) => {
    setValue(value)
  }, [])
  return {
    blocks,
    rootProps: {
      type,
      collapsible,
      defaultValue: blocks[0].value,
      onValueChange,
      value,
    },
  }
}

export default useInfoAccordion
