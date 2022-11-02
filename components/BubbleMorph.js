import { useRef } from 'react'
import SvgBubble from '../svgs/Bubble'

const BubbleMorph = () => {
  const svg = useRef()
  return <SvgBubble ref={svg} />
}

export default BubbleMorph
