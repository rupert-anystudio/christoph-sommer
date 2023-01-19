import { useCallback } from 'react'
import { useState } from 'react'

export const useSelected = () => {
  const [selected, setSelected] = useState(null)
  const onSelect = useCallback((key) => {
    setSelected(key)
  }, [])
  const onDismiss = useCallback(() => {
    setSelected(null)
  }, [])
  const hasSelection = selected !== null
  return {
    selected,
    hasSelection,
    onSelect,
    onDismiss,
  }
}
