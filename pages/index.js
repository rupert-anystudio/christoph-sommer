import { getClient } from '../lib/sanity.server'
import CardGridPortfolio from '../components/CardGridPortfolio'
import { entryQuery } from '../lib/entryHelpers'

export default function Home({ docs = [] }) {
  return (
    <>
      <CardGridPortfolio portfolio={docs} />
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const docsQuery = `*[_type in ["publishedText", "project", "statement", "speech"]]|order(_createdAt desc)${entryQuery}`
  const docs = await client.fetch(docsQuery)
  return {
    revalidate: 10,
    props: {
      preview,
      docs,
    },
  }
}
