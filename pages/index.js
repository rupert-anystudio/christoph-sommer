import { getClient } from '../lib/sanity.server'
import { entryQuery } from '../lib/entryHelpers'

import Portfolio from '../components/Portfolio'

export default function Home({ docs = [], about = {}, annoucements = [] }) {
  return <Portfolio />
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const layout = 'landing'
  // fetch all docs for cards
  const docsQuery = `*[_type in ["publishedText", "project", "statement", "speech"]]|order(publishedAt desc)${entryQuery}`
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
