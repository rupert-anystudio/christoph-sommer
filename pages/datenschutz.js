import ExpandableSection from '../components/ExpandableSection'
import PortableText from '../components/PortableText'
import { getClient } from '../lib/sanity.server'

export default function Datenschutz({ page }) {
  return (
    <ExpandableSection title={page?.title}>
      <PortableText value={page?.content} />
    </ExpandableSection>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  // fetch page content
  const pageQuery = `*[_type == "privacyPage"][0]{ title, content }`
  const page = await client.fetch(pageQuery)
  return {
    revalidate: 10,
    props: {
      preview,
      page,
    },
  }
}
