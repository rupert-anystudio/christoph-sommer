import slugify from 'slugify'
import usePagePropsContext from './usePagePropsContext'
import { getEntryTypeLabel, returnPublicationProps } from '../lib/entryHelpers'

const usePortfolioEntries = () => {
  const { docs } = usePagePropsContext()
  const entries = (docs || []).map(
    ({ _id: id, _type: type, title, context, excerpt, ...doc }) => {
      const typeLabel = getEntryTypeLabel(type)
      const slug = slugify(title, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true,
        locale: 'de',
        trim: true,
      })
      const categories = (doc?.categories || []).map((category) => ({
        key: category._key,
        label: category.title,
      }))
      const links = (doc?.links || []).map((link) => ({
        key: link._key,
        label:
          link.title || (link._type === 'doiLink' ? 'DOI Eintrag' : link.url),
        href: link.url,
      }))
      const coAuthors = (doc?.coAuthors || []).map((author) => ({
        key: author._key,
        label: [author.name, author.surname].filter(Boolean).join(' '),
        href: author?.website?.url,
      }))
      const publications = (doc?.publications || []).map((publication) => ({
        ...returnPublicationProps(publication),
        type: publication._type,
        key: publication._key,
      }))
      return {
        id,
        type,
        typeLabel,
        title,
        slug,
        categories,
        links,
        coAuthors,
        publications,
        context,
        excerpt,
      }
    }
  )
  return entries
}

export default usePortfolioEntries
