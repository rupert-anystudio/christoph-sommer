import { getClient } from '../lib/sanity.server'
import CardGridPortfolio from '../components/CardGridPortfolio'
import HorizontalMansoryGridPortfolio from '../components/HorizontalMansoryGridPortfolio'

export default function Home({ portfolio = [] }) {
  return (
    <>
      <HorizontalMansoryGridPortfolio portfolio={portfolio} />
      <CardGridPortfolio portfolio={portfolio} />
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const portfolio = await client.fetch(
    `*[_type in ["publishedText", "project", "statement", "speech", ""]]{
      _id,
      _type,
      title,
      categories[]->{ title, _id },
      defined(excerpt) => {
        excerpt,
      },
      defined(links) => {
        links,
      },
    }`
  )
  return {
    revalidate: 10,
    props: {
      preview,
      portfolio,
    },
  }
}
