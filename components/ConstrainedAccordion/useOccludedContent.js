import useObservedElement from '../useObservedElement'

export const useOccludedContent = () => {
  const [contentRef, contentDimensions] = useObservedElement()
  const [wrapRef, wrapDimensions] = useObservedElement()

  const occludedSpace = contentDimensions?.height - wrapDimensions?.height
  const isOccluded = occludedSpace > 0

  return {
    occludedSpace,
    isOccluded,
    wrapRef,
    contentRef,
    contentDimensions,
    wrapDimensions,
  }
}
