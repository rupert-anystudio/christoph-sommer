import { useCallback, useState } from 'react'

const ARROW_WIDTH = 60
const ARROW_HEIGHT = 110
const ARROW_OFFSET = 10
const COLLISION_OFFSET = 60
const SVG_PADDING = 200
const BASE_OFFSET = 0

export const useSvgBubble = () => {
  const [bubbleProps, setBubbleProps] = useState(null)

  const onSvgRedraw = useCallback(({ width, height }) => {
    const svgProps = {
      width: width + SVG_PADDING * 2,
      height: height + SVG_PADDING * 2,
      viewBox: `0 0 ${SVG_PADDING * 2 + width} ${SVG_PADDING * 2 + height}`,
      style: {
        position: 'absolute',
        top: -SVG_PADDING,
        left: -SVG_PADDING,
      },
    }
    const baseRectProps = {
      width: width + BASE_OFFSET * 2,
      height: height + BASE_OFFSET * 2,
      x: SVG_PADDING - BASE_OFFSET,
      y: SVG_PADDING - BASE_OFFSET,
      rx: 100,
      ry: 100,
    }
    setBubbleProps({
      svgProps,
      baseRectProps,
    })
  }, [])

  const onResize = useCallback(
    (data) => {
      const rect = data?.rects?.floating
      if (!rect) return
      onSvgRedraw(rect)
    },
    [onSvgRedraw]
  )

  return {
    onResize,
    bubbleProps,
  }
}
