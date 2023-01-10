import { getClient } from '../lib/sanity.server'
import { entryQuery } from '../lib/entryHelpers'

export default function Home() {
  return null
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const layout = 'portfolio'
  // fetch all docs for cards
  const docsQuery = `*[_type in ["publishedText", "project", "statement", "speech"]]|order(publishedAt desc)${entryQuery}`
  const docs = await client.fetch(docsQuery)
  // fetch about content
  const aboutQuery = `*[_type == "aboutPage"][0]{ aboutText, missionStatement }`
  const about = await client.fetch(aboutQuery)
  // fetch annoucements
  const annoucementsQuery = `*[_type == "annoucement" && now() >= date && now() <= dateUntil]{ title, content, date, _id }`
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
