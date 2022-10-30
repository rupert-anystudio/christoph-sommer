import { getClient } from '../../lib/sanity.server'
import CardGridPortfolio from '../../components/CardGridPortfolio'
import { entryQuery } from '../../lib/entryHelpers'

export default function Text({ doc }) {
  return (
    <>
      <CardGridPortfolio portfolio={[doc]} />
    </>
  )
}

export async function getStaticPaths({ locales, preview = false }) {
  const client = getClient(preview)
  const textSlugs = await client.fetch(
    `*[_type in ["publishedText"] && defined(_id)][]._id`
  )
  const paths = textSlugs.map((slug) => ({ params: { slug } }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({
  preview = false,
  params,
  // locale,
  // defaultLocale,
}) {
  const client = getClient(preview)
  const docQuery = `*[_type == "publishedText" && _id == $slug][0]${entryQuery}`
  const doc = await client.fetch(docQuery, params)
  return {
    revalidate: 10,
    props: {
      preview,
      doc,
    },
  }
}
