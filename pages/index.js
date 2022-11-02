import { getClient } from '../lib/sanity.server'
import CardGridPortfolio from '../components/CardGridPortfolio'
import { entryQuery } from '../lib/entryHelpers'
import ExpandableSection from '../components/ExpandableSection'
import PortableText from '../components/PortableText'
import Section from '../components/Section'
import FilterSelect from '../components/FilterSelect'
import FilterSection from '../components/FilterSection'
import { useFilterContext } from '../components/FilterContext'

export default function Home({ docs = [], about = {}, annoucements = [] }) {
  const { filter } = useFilterContext()
  const filteredDocs =
    filter !== 'all' ? docs.filter((d) => d._type === filter) : docs
  return (
    <>
      <ExpandableSection>
        <PortableText value={about?.missionStatement} />
      </ExpandableSection>
      <ExpandableSection title="About">
        <PortableText value={about?.aboutText} />
      </ExpandableSection>
      <FilterSection>
        <FilterSelect />
      </FilterSection>
      <Section>
        <CardGridPortfolio portfolio={filteredDocs} />
      </Section>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  // fetch all docs for cards
  const docsQuery = `*[_type in ["publishedText", "project", "statement", "speech"]]|order(_createdAt desc)${entryQuery}`
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
      docs,
      about,
      annoucements,
    },
  }
}
