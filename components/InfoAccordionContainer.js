import React, { useCallback, useState } from 'react'
import { usePagePropsContext } from './PagePropsContext'
import InfoAccordion from './InfoAccordion'

const InfoAccordionContainer = () => {
  const { about } = usePagePropsContext()
  const blocks = [
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
  const firstBlockValue = blocks[0].value
  const defaultValue = ''
  const type = 'single'
  const [allClosed, setAllClosed] = useState(false)
  const onValueChange = useCallback(
    (value) => {
      const val = value
      if (type === 'multiple') {
        val = val.join('')
      }
      if (allClosed && val !== '') {
        setAllClosed(true)
        return
      }
      if (!allClosed && val === '') {
        setAllClosed(true)
      }
    },
    [allClosed]
  )
  const props = {
    blocks,
    allClosed,
    rootProps: {
      type,
      defaultValue,
      onValueChange,
      collapsible: true,
    },
  }
  return <InfoAccordion {...props} />
}

export default InfoAccordionContainer
