import PortableText from '../components/PortableText'
import { getClient } from '../lib/sanity.server'

export default function Datenschutz({ page }) {
  return <PortableText value={page?.content} />
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const layout = 'static'
  // fetch page content
  const pageQuery = `*[_type == "privacyPage"][0]{ title, content }`
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
