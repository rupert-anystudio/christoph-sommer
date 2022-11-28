import usePagePropsContext from './usePagePropsContext'

const useInfoAccordion = () => {
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
  return {
    blocks,
    rootProps: {
      type: 'single',
      defaultValue: blocks[0].value,
      collapsible: true,
    },
  }
}

export default useInfoAccordion
