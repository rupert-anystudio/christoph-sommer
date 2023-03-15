import { useEffect } from 'react'
import { useRef } from 'react'
import { Small } from '../../components/Primitives'
import { useAccordionContext } from './AccordionContext'

export const AccordionItem = ({ item, children }) => {
  const { observer, returnItemProps } = useAccordionContext()

  // console.log({ item })

  const itemRef = useRef()
  useEffect(() => {
    const itemEl = itemRef.current
    if (!itemEl) return
    observer.observe(itemEl)
    return () => {
      observer.unobserve(itemEl)
    }
  }, [observer])

  return (
    <div>
      {/* <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      > */}
      <div
        onClick={item.onToggle}
        style={{
          position: item.isSelected ? 'sticky' : 'relative',
          top: item.isSelected ? 0 : 'unset',
          // position: 'sticky',
          // top: 0,
          width: '100%',
          height: 'auto',
          padding: 'calc(var(--padding-page) / 2) var(--padding-page)',
          background: 'var(--color-bg)',
          marginBottom: 2,
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        <Small>{item.label}</Small>
        <div
          style={{
            position: 'absolute',
            height: 'calc(var(--padding-page) * 1)',
            width: '100%',
            left: 0,
            top: '100%',
            display: 'block',
            background:
              'linear-gradient(rgba(var(--color-bg-value), var(--color-bg-value), var(--color-bg-value), 1) 0%, rgba(var(--color-bg-value), var(--color-bg-value), var(--color-bg-value), 0) 100%)',
            // background: 'red',
          }}
        />
      </div>
      {/* </div> */}
      <div
        style={{
          position: 'relative',
          height: `auto`,
          width: '100%',
          maxHeight: item.isSelected
            ? 'none'
            : 'var(--any-accordion-item-minheight)',
          borderBottom: !item.isLast ? 'var(--border)' : 'none',
          background: 'var(--color-bg)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={itemRef}
          {...returnItemProps(item.key)}
          style={{
            position: 'relative',
            height: `auto`,
            width: '100%',
          }}
        >
          {children}
        </div>
        <div
          style={{
            position: 'absolute',
            height: 'calc(var(--any-accordion-item-minheight) / 2)',
            width: '100%',
            left: 0,
            bottom: 0,
            transform: `translateY(${item.isSelected ? 100 : 0}%)`,
            background:
              'linear-gradient(rgba(var(--color-bg-value), var(--color-bg-value), var(--color-bg-value), 0) 0%, rgba(var(--color-bg-value), var(--color-bg-value), var(--color-bg-value), 1) 100%)',
          }}
        />
      </div>
    </div>
  )
}
