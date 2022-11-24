import ExpandableSection from '../components/ExpandableSection'
import { MainMiddle } from '../components/Main'
import PortableText from '../components/PortableText'
import { getClient } from '../lib/sanity.server'

export default function Datenschutz({ page }) {
  return (
    <MainMiddle>
      <ExpandableSection title={page?.title}>
        <PortableText value={page?.content} />
      </ExpandableSection>
    </MainMiddle>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
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
      page,
      about,
      annoucements,
    },
  }
}
