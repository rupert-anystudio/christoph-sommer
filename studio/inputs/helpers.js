import sanityClient from 'part:@sanity/base/client'
import sanityConfig from '../../lib/sanity.config'
import { nanoid } from 'nanoid'

const { apiVersion } = sanityConfig

export const client = sanityClient.withConfig({ apiVersion })

export const returnNewReferenceEntry = (_ref) => {
  const _key = nanoid()
  return {
    _key,
    _ref,
    _type: 'reference',
  }
}

export const sanityFetch = async (query, cbSuccess, cbFailure) => {
  client
    .fetch(query)
    .then((payload) => {
      cbSuccess(payload)
    })
    .catch((error) => {
      cbFailure(error)
    })
}

export const getSanityFormFieldProps = (props) => {
  const { type, markers, presence, compareValue = [], level } = props
  return {
    description: type.description,
    label: type.title,
    markers: markers,
    presence: presence,
    __unstable_markers: markers,
    __unstable_presence: presence,
    // __unstable_changeIndicator: { compareValue },
    // changeIndicator: { compareValue },
    compareValue,
    level,
  }
}
