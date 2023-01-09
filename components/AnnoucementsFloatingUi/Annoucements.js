import styled, { keyframes } from 'styled-components'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  arrow,
  limitShift,
  FloatingPortal,
  size,
  autoPlacement,
} from '@floating-ui/react'
import { CircleButton, Title } from '../Primitives'
import { ScaleInAnimation } from './ScaleInAnimation'
import { useAnnoucement } from './useAnnoucement'
import { useRef, useState } from 'react'
import PortableText from '../PortableText'

const ARROW_WIDTH = 30
const ARROW_HEIGHT = 50

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

const ScaleIn = styled.div`
  transform-origin: var(--annoucement-transform-origin);
  position: relative;
  animation: ${scaleIn} 0.2s ease-out;
`

const NotificationWrap = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  top: 28.9%;
  left: 77.6%;
`

const Floating = styled.div`
  position: relative;
  padding: 0 2rem;
`

const Arrow = styled.div`
  position: absolute;
  display: block;
  width: ${ARROW_WIDTH / 10}rem;
  height: ${ARROW_HEIGHT / 10}rem;
`

const ArrowBack = styled(Arrow)`
  outline: 2px solid var(--color-txt);
`

const ArrowFront = styled(Arrow)`
  background: var(--color-bg);
`

const Svg = styled.div`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  /* outline: 2px solid green; */
`

const ContentWrap = styled.div`
  position: relative;
  width: clamp(28rem, 80vw, 60rem);
  padding: var(--padding-page);
  color: var(--color-txt);
  background: var(--color-bg);
  outline: 2px solid var(--color-txt);
`

const AnnoucementContent = ({ title, content }) => {
  return (
    <ContentWrap>
      <Title as="h1">{title}</Title>
      <PortableText value={content} />
    </ContentWrap>
  )
}

export const Annoucements = () => {
  const [annoucement, amount] = useAnnoucement()

  const arrowRef = useRef(null)
  const svgRef = useRef(null)
  // popover state
  const [open, setOpen] = useState(false)
  // floating ui wiring
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement: floatingPlacement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    placement: 'top',
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 10 + ARROW_HEIGHT }),
      flip({
        padding: 30,
      }),
      // autoPlacement({
      //   // alignment: 'top',
      //   padding: 90,
      //   allowedPlacements: ['bottom', 'top-end', 'top-start'],
      // }),
      shift(),
      size({
        apply({ rects }) {
          // console.log(rects?.floating)
          // Object.assign(svgRef.current.style, {
          //   width: `${rects.floating.width}px`,
          //   height: `${rects.floating.height}px`,
          // })
        },
      }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  })
  // set up interactions
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context)
  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[floatingPlacement.split('-')[0]]

  const arrowStyle = {
    position: 'absolute',
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
    [staticSide]: `-${ARROW_HEIGHT / 10}rem`,
  }

  return (
    <>
      <NotificationWrap {...getReferenceProps({ ref: reference })}>
        <ScaleInAnimation>
          <CircleButton>{amount}</CircleButton>
        </ScaleInAnimation>
      </NotificationWrap>
      {/* <FloatingPortal> */}
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <Floating
            {...getFloatingProps({
              ref: floating,
              style: {
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                '--annoucement-transform-origin': `${
                  arrowX != null ? `${arrowX + ARROW_WIDTH / 2}px` : 'center'
                } -${ARROW_HEIGHT}px`,
              },
            })}
          >
            <ScaleIn>
              <ArrowBack ref={arrowRef} style={arrowStyle} />
              {/* <Svg ref={svgRef} /> */}
              <AnnoucementContent {...annoucement} />
              <ArrowFront style={arrowStyle} />
            </ScaleIn>
          </Floating>
        </FloatingFocusManager>
      )}
      {/* </FloatingPortal> */}
    </>
  )
}
