import { forwardRef, useCallback, useEffect } from 'react'
import { useObservedElements } from '../../any-hooks/useObservedElements'
import { AccordionContext } from './AccordionContext'
import { Accordion } from './Accordion'
import { useAccordionItems } from '../../any-hooks/useAccordionItems'
import { useState } from 'react'
import _isEqual from 'lodash/isEqual'

export const AccordionContainer = forwardRef(
  ({ items: givenItems, renderItem, style, className }, ref) => {
    const [computedValues, setComputedValues] = useState(null)
    const [itemHeights, setItemHeights] = useState(null)

    const onObserve = useCallback((entries) => {
      let newComputedValues = {}
      const newItemHeights = entries.reduce((acc, entry) => {
        const { target, contentRect, id, group } = entry
        if (group === 'layout' && id === 'wrap') {
          const computed = getComputedStyle(target)
          /* prettier-ignore */
          newComputedValues['--any-accordion-height'] = computed.getPropertyValue('--any-accordion-height')
          /* prettier-ignore */
          newComputedValues['--any-accordion-item-minheight'] = computed.getPropertyValue('--any-accordion-item-minheight')
          return acc
        }
        if (group !== 'item') return acc
        acc[id] = contentRect?.height
        return acc
      }, {})
      setComputedValues((prevValues) => {
        const updatedValues = { ...prevValues, ...newComputedValues }
        const equalValues = _isEqual(prevValues, updatedValues)
        if (equalValues) return prevValues
        return updatedValues
      })
      setItemHeights((prevItemHeights) => {
        const updatedItemHeights = { ...prevItemHeights, ...newItemHeights }
        const equalItemHeights = _isEqual(prevItemHeights, updatedItemHeights)
        if (equalItemHeights) return prevItemHeights
        return updatedItemHeights
      })
    }, [])

    useEffect(() => {
      console.log({ useEffect: 'itemHeights', itemHeights })
    }, [itemHeights])

    useEffect(() => {
      console.log({ useEffect: 'computedValues', computedValues })
    }, [computedValues])

    // const [accordionHeight, setAccordionHeight] = useState(null)
    // const [itemMinHeight, setItemMinHeight] = useState(null)
    // const [heights, setHeights] = useState(null)

    // const onObserve = useCallback(
    //   (entries) => {
    //     const newHeights = entries.reduce(
    //       (acc, entry) => {
    //         const { target, contentRect, id, group } = entry
    //         acc[group] = {
    //           ...acc[group],
    //           [id]: contentRect?.height,
    //         }
    //         if (group === 'layout' && id === 'wrap') {
    //           const computed = getComputedStyle(target)
    //           const newAccordionHeight = computed.getPropertyValue(
    //             '--any-accordion-height'
    //           )
    //           const newItemMinHeight = computed.getPropertyValue(
    //             '--any-accordion-item-minheight'
    //           )
    //           setAccordionHeight(newAccordionHeight)
    //           setItemMinHeight(newItemMinHeight)
    //         }
    //         return acc
    //       },
    //       { ...heights }
    //     )
    //     setHeights(newHeights)
    //   },
    //   [heights]
    // )

    const { observer, returnObservedProps } = useObservedElements(onObserve)
    const returnLayoutProps = (key) => returnObservedProps('layout', key)
    const returnItemProps = (key) => returnObservedProps('item', key)
    const items = useAccordionItems(givenItems)

    // useEffect(() => {
    //   console.log({ accordionHeight })
    // }, [accordionHeight])

    return (
      <AccordionContext.Provider
        value={{
          observer,
          items,
          returnLayoutProps,
          returnItemProps,
          renderItem,
        }}
      >
        <Accordion style={style} className={className} ref={ref} />
      </AccordionContext.Provider>
    )
  }
)

AccordionContainer.displayName = 'AccordionContainer'
