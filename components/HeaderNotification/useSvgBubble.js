import { useCallback, useState } from 'react'

export const useSvgBubble = (config = {}) => {
  const { safeZone = 800, baseOffset = 0 } = config
  const [bubbleProps, setBubbleProps] = useState(null)

  const onSvgRedraw = useCallback(
    ({ width, height }) => {
      const svgProps = {
        width: width + safeZone * 2,
        height: height + safeZone * 2,
        viewBox: `0 0 ${safeZone * 2 + width} ${safeZone * 2 + height}`,
        style: {
          position: 'absolute',
          top: -safeZone,
          left: -safeZone,
        },
      }
      const baseRectProps = {
        width,
        height,
        x: safeZone,
        y: safeZone,
      }
      const shapeRectProps = {
        width: baseRectProps.width + baseOffset * 2,
        height: baseRectProps.height + baseOffset * 2,
        x: baseRectProps.x - baseOffset,
        y: baseRectProps.y - baseOffset,
        rx: 100,
        ry: 100,
      }
      setBubbleProps({
        svgProps,
        baseRectProps,
        shapeRectProps,
      })
    },
    [baseOffset, safeZone]
  )

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
