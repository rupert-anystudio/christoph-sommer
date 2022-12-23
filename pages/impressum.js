import { getClient } from '../lib/sanity.server'

export default function Impressum() {
  return null
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const layout = 'static'
  // fetch page content
  const pageQuery = `*[_type == "imprintPage"][0]{ title, content }`
  const page = await client.fetch(pageQuery)
  // fetch about content
  const aboutQuery = `*[_type == "aboutPage"][0]{ aboutText, missionStatement }`
  const about = await client.fetch(aboutQuery)
  // fetch annoucements
  const annoucementsQuery = `*[_type == "annoucement"]{ title, content, date, _id }`
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
