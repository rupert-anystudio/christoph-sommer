import { getClient } from '../lib/sanity.server'
import CardGridPortfolio from '../components/CardGridPortfolio'
import { entryQuery } from '../lib/entryHelpers'

export default function Home({ docs = [], about = {} }) {
  return (
    <>
      <CardGridPortfolio portfolio={docs} />
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  // fetch all docs for cards
  const docsQuery = `*[_type in ["publishedText", "project", "statement", "speech"]]|order(_createdAt desc)${entryQuery}`
  const docs = await client.fetch(docsQuery)
  // fetch about content
  const aboutQuery = `*[_type == "aboutPage"]{ aboutText, missionStatement }`
  const about = await client.fetch(aboutQuery)
  return {
    revalidate: 10,
    props: {
      preview,
      docs,
      about,
    },
  }
}
