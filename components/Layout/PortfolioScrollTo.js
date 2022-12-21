import styled from 'styled-components'
import usePortfolioContext from '../../hooks/usePortfolioContext'
import useScrollToElemAfterValueChange from '../../hooks/useScrollToElemAfterValueChange'

const Target = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
`

const PortfolioScrollTo = () => {
  const { view, filter } = usePortfolioContext()
  const observedValue = [view, filter].filter(Boolean).join('-')
  const scrollToRef = useScrollToElemAfterValueChange(observedValue)
  return <Target ref={scrollToRef} />
}

export default PortfolioScrollTo
