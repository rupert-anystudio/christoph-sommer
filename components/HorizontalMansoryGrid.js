import styled from 'styled-components'

const Grid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1px;
  padding: 1px;
`

const Entry = styled.div`
  flex: 1 0 auto;
  min-height: 22rem;
  font-family: var(--ff-title);
  font-size: var(--fs-large);
  line-height: var(--lh-large);
`

const getKey_ = (entry) => entry?._id ?? null

const renderContent_ = (entry) => <strong>{entry?.title ?? ''}</strong>

const HorizontalMansoryGrid = ({
  entries = [],
  getKey = getKey_,
  renderContent = renderContent_,
}) => {
  return (
    <Grid>
      {entries.map((entry) => {
        const key = getKey(entry)
        if (!key) return null
        const width = Math.floor(Math.random() * 250) + 250
        return (
          <Entry key={key} style={{ width }}>
            {renderContent(entry)}
          </Entry>
        )
      })}
    </Grid>
  )
}

export default HorizontalMansoryGrid
