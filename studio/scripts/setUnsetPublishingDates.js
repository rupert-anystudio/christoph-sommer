const sanityClient = require('@sanity/client')

const config = {
  dataset: 'production',
  projectId: 'jzd1x7me',
  useCdn: false,
  apiVersion: '2021-10-21',
  token: process.env.SANITY_MIGRATION_TOKEN,
}

const client = sanityClient(config)

const docsQuery = `*[_type in ["publishedText", "project", "speech", "statement"] && publishedAt == null][0...50]{ _id, publishedAt }`

async function run() {
  console.log('fetching docs')
  const docs = await client.fetch(docsQuery)
  console.log('docs found', docs, docs.length)
  // const mutations = docs.reduce((acc, doc) => {
  //   return [
  //     ...acc,
  //     { id: doc._id, patch: { set: { publishedAt: '2022-12-15' } } },
  //   ]
  // }, [])
  // console.log('mutations prepared', mutations)
  // const transaction = mutations.reduce((acc, mutation) => {
  //   if (mutation.create) {
  //     acc.create(mutation.create)
  //   }
  //   if (mutation.delete) {
  //     acc.delete(mutation.delete)
  //   }
  //   if (mutation.patch) {
  //     acc.patch(mutation.id, mutation.patch)
  //   }
  //   return acc
  // }, client.transaction())
  // console.log('transaction prepared', transaction)
  // await transaction.commit()
  // console.log('transaction commited, done')
}

run()
