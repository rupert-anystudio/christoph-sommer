import { getClient } from '../lib/sanity.server'

export default function NotFound() {
  return null
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const layout = 'static'
  // fetch page content
  const pageQuery = `*[_type == "notFoundPage"][0]{ title, content }`
  const page = await client.fetch(pageQuery)
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
      page,
      about,
      annoucements,
    },
  }
}