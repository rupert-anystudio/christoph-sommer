import { useEffect } from 'react'
import { useState } from 'react'

export const useItemLayout = (items, dimensions) => {
  const [layout, setLayout] = useState(null)
  useEffect(() => {
    if (!items || !dimensions) return
    const measuredItems = items.map(({ key }) => {
      const size = dimensions[key] ?? {}
      return {
        key,
        wrap: size?.wrap?.height,
        content: size?.content?.height,
      }
    })
    const contentHeightCalculated = measuredItems.reduce((acc, item) => {
      const itemHeight = item?.wrap ?? 0
      acc += itemHeight
      return acc
    }, 0)
    setLayout({
      contentHeightCalculated,
      measuredItems,
    })
  }, [items, dimensions])

  useEffect(() => {
    console.log({ layout })
  }, [layout])

  return layout
}
