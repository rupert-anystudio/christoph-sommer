import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(42rem, 1fr));
`

const getKey_ = (entry) => entry?._id ?? null

const renderContent_ = (entry) => <strong>{entry?.title ?? ''}</strong>

const CardGrid = ({
  entries = [],
  getKey = getKey_,
  renderContent = renderContent_,
}) => {
  return (
    <>
      {entries.map((entry) => {
        const key = getKey(entry)
        if (!key) return null
        return <React.Fragment key={key}>{renderContent(entry)}</React.Fragment>
      })}
    </>
  )
}

export default CardGrid
