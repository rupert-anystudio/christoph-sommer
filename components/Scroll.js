import * as ScrollArea from '@radix-ui/react-scroll-area'
import { forwardRef } from 'react'
import styled from 'styled-components'

const Root = styled(ScrollArea.Root)`
  position: relative;
  width: 100%;
  height: 100%;
`
const Viewport = styled(ScrollArea.Viewport)`
  position: relative;
  width: 100%;
  height: 100%;
`
const Scrollbar = styled(ScrollArea.Scrollbar)``
const Thumb = styled(ScrollArea.Thumb)``
const Corner = styled(ScrollArea.Corner)``

const Scroll = forwardRef(({ children, ...props }, forwardedRef) => (
  <Root {...props} ref={forwardedRef}>
    <Viewport>{children}</Viewport>
    <Scrollbar orientation="horizontal">
      <Thumb />
    </Scrollbar>
    <Scrollbar orientation="vertical">
      <Thumb />
    </Scrollbar>
    <Corner />
  </Root>
))
Scroll.displayName = 'Scroll'

export default Scroll
