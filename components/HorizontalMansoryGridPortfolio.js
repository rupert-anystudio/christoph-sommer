import styled from 'styled-components'
import HorizontalMansoryGrid from './HorizontalMansoryGrid'
import { getEntryTypeColor } from '../lib/entryHelpers'

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  color: white;
`

const HorizontalMansoryGridPortfolio = ({ portfolio = [] }) => {
  const getKey = (entry) => entry?._id ?? null

  const renderContent = (entry) => {
    const color = getEntryTypeColor(entry)
    return (
      <Content style={{ background: color }}>
        <div>{entry?.title}</div>
      </Content>
    )
  }

  return (
    <HorizontalMansoryGrid
      entries={portfolio}
      getKey={getKey}
      renderContent={renderContent}
    />
  )
}

export default HorizontalMansoryGridPortfolio
