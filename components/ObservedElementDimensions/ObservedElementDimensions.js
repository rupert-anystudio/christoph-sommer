import { useRef } from 'react'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'
import useObservedElementDimensions from './useObservedElementDimensions'

const ObservedElementDimensions = ({
  children,
  style,
  className,
  observedId,
  observedGroup,
}) => {
  const elRef = useRef()
  const { observer } = useObservedElementDimensions()

  useIsomorphicLayoutEffect(() => {
    const el = elRef.current
    if (!el) return
    observer.observe(el)
    return () => {
      observer.unobserve(el)
    }
  }, [])

  return (
    <div
      ref={elRef}
      data-observed-id={observedId}
      data-observed-group={observedGroup}
      style={{
        position: 'relative',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  )
}

export default ObservedElementDimensions
