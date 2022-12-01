import styled from 'styled-components'
import * as ScrollArea from '@radix-ui/react-scroll-area'

const ScrollRoot = styled(ScrollArea.Root)`
  height: 100%;
  transform: translate3d(0px, 0px, 0px);
  --scrollbar-size: 12px;
`
const ScrollViewport = styled(ScrollArea.Viewport)`
  height: 100%;
  @media (max-width: 919px) {
    overflow: visible !important;
  }
  > div {
    min-height: 100%;
  }
`
const ScrollBar = styled(ScrollArea.Scrollbar)`
  position: relative;
  display: flex;
  /* ensures no selection */
  user-select: none;
  /* disable browser handling of all panning and zooming gestures on touch devices */
  touch-action: none;
  padding: 2px;
  background: none;
  &[data-orientation='vertical'] {
    width: var(--scrollbar-size);
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-bg);
    opacity: 0.66;
  }
`

const ScrollThumb = styled(ScrollArea.Thumb)`
  flex: 1;
  background: var(--color-txt);
  border-radius: var(--scrollbar-size);
  position: relative;
  /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`

const Scroll = ({ children, rootRef, viewportRef }) => (
  <ScrollRoot ref={rootRef}>
    <ScrollViewport ref={viewportRef}>{children}</ScrollViewport>
    <ScrollBar orientation="vertical">
      <ScrollThumb />
    </ScrollBar>
  </ScrollRoot>
)

export default Scroll
