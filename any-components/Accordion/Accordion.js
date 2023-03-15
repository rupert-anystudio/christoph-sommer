import { useEffect } from 'react'
import { useRef } from 'react'
import { forwardRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import { useAccordionContext } from './AccordionContext'
import { AccordionItem } from './AccordionItem'
import { AccordionScroll } from './AccordionScroll'

export const Accordion = forwardRef((props, ref) => {
  const { observer, returnLayoutProps, items, renderItem } =
    useAccordionContext()

  const wrapRef = useRef()
  useEffect(() => {
    const wrapEl = wrapRef.current
    if (!wrapEl) return
    observer.observe(wrapEl)
    return () => {
      observer.unobserve(wrapEl)
    }
  }, [observer])

  return (
    <div
      {...props}
      {...returnLayoutProps('wrap')}
      ref={mergeRefs([wrapRef, ref])}
    >
      <AccordionScroll>
        {items.map((item) => (
          <AccordionItem key={item.key} item={item}>
            {renderItem(item)}
          </AccordionItem>
        ))}
      </AccordionScroll>
    </div>
  )
})

Accordion.displayName = 'Accordion'
