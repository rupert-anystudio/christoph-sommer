import { getClient } from '../lib/sanity.server'
import CardGridPortfolio from '../components/CardGridPortfolio'

export default function Home({ portfolio = [] }) {
  return (
    <>
      <CardGridPortfolio portfolio={portfolio} />
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const client = getClient(preview)
  const portfolio = await client.fetch(
    `*[_type in ["publishedText", "project", "statement", "speech"]]|order(_createdAt desc){
      _id,
      _type,
      title,
      categories[]->{
        _id,
        title,
      },
      excerpt[],
      links[],
      _type == "project" => {
        timeframe,
      },
      _type in ["statement", "speech"] => {
        context,
        date,
      },
      _type == "publishedText" => {
        coAuthors[]->{
          _id,
          name,
          surname,
        },
        publications[]{
          _type,
          _key,
          _type == "publicationNewspaper" => {
            date,
            newspaper->{
              title,
              website,
            },
          },
          _type == "magazineIssue" => {
            ...@->{
              issue,
              title,
              magazine->{
                title,
                website,
                publisher->{
                  title,
                  website,
                },
              },
            },
          },
          _type == "book" => {
            ...@->{
              title,
              subtitle,
              date,
              publisher->{
                title,
                website,
              },
              editors[]->,
              authors[]->,
            },
          },
        },
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
