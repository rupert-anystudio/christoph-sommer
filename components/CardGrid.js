import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-gap: var(--padding-page);
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
`

const getKey_ = (entry) => entry?._id ?? null

const renderContent_ = (entry) => <strong>{entry?.title ?? ''}</strong>

const CardGrid = ({
  entries = [],
  getKey = getKey_,
  renderContent = renderContent_,
}) => {
  return (
    <Grid>
      {entries.map((entry) => {
        const key = getKey(entry)
        if (!key) return null
        return <React.Fragment key={key}>{renderContent(entry)}</React.Fragment>
      })}
    </Grid>
  )
}

export default CardGrid
