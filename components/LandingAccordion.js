import * as ScrollArea from '@radix-ui/react-scroll-area'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { useCallback, useState, useRef, useMemo, useEffect } from 'react'
import { Flip } from 'gsap/Flip'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import { Timeline } from 'gsap/gsap-core'
import { TweenLite } from 'gsap/gsap-core'

const itemContents = gsap.utils.wrap([
  'Lorem ipsum dolor sit amet consectetur adipiscing elit at aliquet habitant nibh, lacus dapibus elementum diam nulla mus massa euismod mauris rhoncus. Leo justo nisi molestie tempor mattis ornare feugiat tempus aptent proin ac duis lacinia, neque eleifend turpis praesent netus condimentum accumsan felis magna purus viverra. Congue erat malesuada vestibulum gravida rutrum ridiculus nostra sociis orci egestas cursus suspendisse aliquam bibendum tristique volutpat in, vehicula sed parturient ligula libero metus fringilla senectus pretium penatibus habitasse enim aenean conubia cubilia. Dictumst iaculis quisque lectus tellus ultrices dictum sem himenaeos, torquent blandit fermentum porttitor class curae lobortis donec etiam, platea morbi sagittis hendrerit urna auctor eget. Mi placerat facilisi integer pharetra interdum posuere litora luctus, ad sapien varius pulvinar nam ultricies venenatis risus consequat, vulputate a commodo primis cum nullam vitae. Facilisis odio et imperdiet potenti arcu id quam per nunc fames magnis sociosqu inceptos maecenas, ante dis taciti ut dignissim sodales dui eu tortor velit nascetur est. Faucibus phasellus quis natoque non suscipit eros, nisl ullamcorper pellentesque convallis cras. Sollicitudin scelerisque montes mollis tincidunt laoreet vivamus vel augue nec fusce, porta hac curabitur semper torquent eleifend dictumst semper habitasse viverra ante, platea egestas inceptos sociosqu facilisi tincidunt porta scelerisque aliquet.',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit leo, magna consequat ac nisi porttitor odio rutrum, duis netus purus metus tempor ligula erat. Volutpat diam convallis dictum hendrerit vestibulum tincidunt luctus arcu, porta est per nisl sociis cras tellus, penatibus senectus lacinia proin nullam vivamus venenatis. Nec nam molestie commodo mattis nascetur nulla, lacus ad sociosqu etiam aliquam aptent, nibh cubilia at eros bibendum. Phasellus ultrices neque integer donec dis egestas mollis, curabitur potenti ullamcorper torquent dignissim sem, ut rhoncus malesuada vitae mi mus. A ornare morbi lobortis ultricies fermentum auctor nostra aliquet ante eu, cum quam enim natoque turpis vel pulvinar laoreet quis orci, semper fringilla libero tristique litora suspendisse sed montes interdum. Eleifend varius cursus inceptos, risus lectus.',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit malesuada vestibulum parturient, enim diam gravida neque porttitor semper litora ante condimentum, felis quam imperdiet pretium hendrerit velit fermentum eros vitae. A vel nam ultricies inceptos fringilla fames nullam consequat, congue montes nunc turpis senectus vivamus interdum class, tempus quis tortor mi varius egestas erat. Pharetra ultrices cum venenatis tristique urna placerat nisl sollicitudin, scelerisque orci posuere iaculis faucibus convallis lacus leo, aenean proin nostra himenaeos dui cubilia nisi. Suscipit libero nec feugiat auctor commodo justo donec cursus rutrum sapien cras, etiam curabitur elementum primis sociis suspendisse ad ridiculus conubia habitant, arcu vehicula tellus risus ullamcorper aptent laoreet taciti in bibendum. Vulputate mus pellentesque sem natoque nulla integer torquent, sodales nascetur accumsan maecenas magna magnis, ornare habitasse volutpat tincidunt rhoncus pulvinar. Porta massa per potenti sagittis phasellus praesent duis, facilisis ut id lobortis odio et, viverra sed dictum aliquet blandit dis. Nibh lacinia fusce aliquam metus morbi non est ac facilisi lectus dignissim, molestie tempor at eu luctus netus quisque dictumst mattis sociosqu hac, purus mauris eleifend curae mollis dapibus penatibus ligula euismod eget. Augue platea tempus tincidunt curae risus diam cum habitant facilisis interdum, vehicula integer penatibus gravida ligula parturient vulputate hac fames, egestas metus nascetur quisque phasellus semper rhoncus viverra velit. Taciti proin porta mollis tristique platea conubia odio condimentum sollicitudin malesuada tortor, pulvinar pretium fermentum arcu duis accumsan sociis class maecenas lobortis. A imperdiet netus varius cras ridiculus orci enim, consequat est ut nec nisi mus venenatis, morbi quis tempor nibh aptent placerat. Nullam pellentesque in donec fusce hendrerit sagittis nam suspendisse, vel potenti vitae sapien eros laoreet praesent convallis, lectus vestibulum sociosqu litora euismod dui at. Leo rutrum urna augue natoque erat volutpat justo montes aliquam, habitasse lacinia per mattis eget dis ultricies aliquet, dictum eu ac purus auctor molestie nulla etiam. Felis mi posuere inceptos dapibus congue libero porttitor curabitur, nisl turpis non sed dignissim massa torquent et id, ullamcorper cursus facilisi lacus commodo eleifend quam. Ad feugiat blandit aenean cubilia faucibus bibendum, tellus nostra pharetra neque.',
])
const itemColors = gsap.utils.wrap(['#ff3838', '#c79800', '#15b400', '#b000d3'])

const useAccordion = () => {
  const [value, setValue] = useState('')

  const onItemSelect = useCallback((key) => {
    setValue((prevKey) => {
      if (prevKey === key) return ''
      return key
    })
  }, [])

  const items = useMemo(() => {
    return ['One', 'Two', 'Three'].map((key, i) => ({
      key,
      value: key,
      label: key,
      isOpen: value === key,
      color: itemColors(i),
      content: itemContents(i),
    }))
  }, [value])

  return {
    value,
    onItemSelect,
    items,
  }
}

const Item = styled.div`
  position: relative;
`

const Header = styled.div`
  position: relative;
  > div {
    transform: translate3d(0px, 0px, 0px);
    will-change: transform;
  }
`

const Content = styled.div`
  position: relative;
  overflow: hidden;
  > div {
    transform: translate3d(0px, 0px, 0px);
    will-change: transform;
  }
`

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
`

const Bar = styled.div`
  position: relative;
  padding: 20px;
  background-color: var(--color-bg);
`

const ScrollRoot = styled(ScrollArea.Root)`
  height: 100%;
`
const ScrollViewport = styled(ScrollArea.Viewport)`
  /* height: auto;
  max-height: 100%; */

  height: 100%;
  @media (max-width: 919px) {
    overflow: visible !important;
  }
  > div {
    min-height: 100%;
  }
`
const ScrollBar = styled(ScrollArea.Scrollbar)``
const ScrollThumb = styled(ScrollArea.Thumb)``

const Scroll = ({ children, rootRef, viewportRef }) => (
  <ScrollRoot ref={rootRef}>
    <ScrollViewport ref={viewportRef}>{children}</ScrollViewport>
    <ScrollBar orientation="vertical">
      <ScrollThumb />
    </ScrollBar>
  </ScrollRoot>
)

const targets = [
  'accordion-item-header',
  'accordion-item-content',
  'accordion-item-content-div',
]
  .map((c) => `.${c}`)
  .join(', ')

const useGsapAccordion = () => {
  const rootRef = useRef()
  const q = useMemo(() => gsap.utils.selector(rootRef), [])

  const { items, onItemSelect } = useAccordion()
  const [layout, setLayout] = useState({
    items,
    state: null,
  })
  const [sticky, setSticky] = useState(true)

  useEffect(() => {
    setLayout({
      state: Flip.getState(q(targets)),
      items,
    })
  }, [items, q])

  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!layout.state) return
      let timeline = Flip.from(layout.state, {
        ease: 'power1.inOut',
        duration: 1.5,
        targets,
        simple: true,
        nested: true,
        onStart: () => {
          console.log('onStart')
        },
        onComplete: () => {
          console.log('onComplete')
        },
      })
      return () => {
        timeline.clear()
        timeline.kill()
      }
    }, rootRef)
    return () => ctx.revert()
  }, [layout])

  return {
    rootRef,
    items: layout.items,
    onItemSelect,
  }
}

const LandingAccordion = () => {
  const { items, onItemSelect, rootRef } = useGsapAccordion()

  return (
    <Scroll rootRef={rootRef}>
      {items.map((item) => {
        const { key, isOpen, label, color, content } = item
        return (
          <Item
            key={key}
            style={{ '--color-bg': color }}
            onClick={(e) => {
              e.preventDefault()
              onItemSelect(key)
            }}
          >
            <Sticky>
              <Header
                data-flip-id={`header-${key}`}
                className="accordion-item-header"
              >
                <div
                  data-flip-id={`header-div-${key}`}
                  className="accordion-item-header-div"
                >
                  <Bar>{label}</Bar>
                </div>
              </Header>
            </Sticky>
            <Content
              data-flip-id={`content-${key}`}
              className="accordion-item-content"
              style={{ maxHeight: isOpen ? 'none' : 96 }}
            >
              <div
                data-flip-id={`content-div-${key}`}
                className="accordion-item-content-div"
                // style={{ height: isOpen ? 'auto' : 96 }}
              >
                {content}
              </div>
            </Content>
          </Item>
        )
      })}
    </Scroll>
  )
}

export default LandingAccordion
