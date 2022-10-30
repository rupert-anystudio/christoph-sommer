import styled from 'styled-components'
import { Body } from './Primitives'

const Wrap = styled.div`
  color: var(--color-txt);
  &:not(:last-child) {
    /* margin-bottom: 1rem; */
  }
`

const Value = styled(Body)`
  margin-right: 0.2em;
  &:after {
    content: ',';
  }
`

const Date = styled(Body)``

const Publication = ({ date, value, url }) => {
  const content = (
    <>
      <Value>{value}</Value>
      <Date>{date}</Date>
    </>
  )
  if (url)
    return (
      <Wrap as="a" href={url}>
        {content}
      </Wrap>
    )
  return <Wrap>{content}</Wrap>
}

export default Publication
