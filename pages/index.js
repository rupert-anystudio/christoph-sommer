import { getClient } from '../lib/sanity.server'
import CardGridPortfolio from '../components/CardGridPortfolio'
import { entryQuery } from '../lib/entryHelpers'
import useFilterContext from '../hooks/useFilterContext'

export default function Home({ docs = [], about = {}, annoucements = [] }) {
  const { filter } = useFilterContext()
  const filteredDocs =
    filter !== 'all' ? docs.filter((d) => d._type === filter) : docs
  return <CardGridPortfolio portfolio={filteredDocs} />
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const layout = 'landing'
  // fetch all docs for cards
  const docsQuery = `*[_type in ["publishedText", "project", "statement", "speech"]]|order(_createdAt desc)|order(timeframe.start desc)${entryQuery}`
  const docs = await client.fetch(docsQuery)
  // fetch about content
  const aboutQuery = `*[_type == "aboutPage"][0]{ aboutText, missionStatement }`
  const about = await client.fetch(aboutQuery)
  // fetch annoucements
  const annoucementsQuery = `*[_type == "annoucement"]{ title, content, date }`
  const annoucements = await client.fetch(annoucementsQuery)
  return {
    revalidate: 10,
    props: {
      preview,
      layout,
      docs,
      about,
      annoucements,
    },
  }
}
