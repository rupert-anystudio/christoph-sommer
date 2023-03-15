import { useCallback, useState } from 'react'

export const useAccordionItems = (givenItems = []) => {
  const [selected, setSelected] = useState(null)

  const items = givenItems
    .map((item, index) => {
      if (!item?.key) return null
      const isSelected = !!selected
      const isFirst = index === 0
      const isLast = index === givenItems.length - 1
      return {
        ...item,
        isSelected,
        isFirst,
        isLast,
        onToggle: () => {
          setSelected((prevKey) => {
            if (item.key === prevKey) return null
            return item.key
          })
        },
      }
    })
    .filter(Boolean)

  return items
}
