import { useRef } from 'react'

export const useAnnoucementLayout = ({ isResizing }) => {
  const notificationRef = useRef(null)
  return [notificationRef]
}
