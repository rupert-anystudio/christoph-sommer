import styled from 'styled-components'
import useFilterContext from '../../hooks/useFilterContext'
import usePagePropsContext from '../../hooks/usePagePropsContext'

const Wrap = styled.div`
  position: relative;
  width: 100%;
`

export const Portfolio = () => {
  const { docs = [] } = usePagePropsContext()
  const { filter = 'all' } = useFilterContext()
  return <Wrap></Wrap>
}
