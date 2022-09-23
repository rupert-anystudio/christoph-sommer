import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  padding: 2rem;
`

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  > * {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
`

export const CardTitle = styled.div`
  font-size: var(--fs-large);
  line-height: var(--lh-large);
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
        return <Card key={key}>{renderContent(entry)}</Card>
      })}
    </Grid>
  )
}

export default CardGrid
