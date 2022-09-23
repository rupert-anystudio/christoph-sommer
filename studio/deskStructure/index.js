import S from '@sanity/desk-tool/structure-builder'
import sanityClient from 'part:@sanity/base/client'
import apiVersion from '../../lib/sanityApiVersion'
import config from '../sanity.json'
import { adminItems, defaultItems } from './deskStructure'

const client = sanityClient.withConfig({ apiVersion })
const projectName = config.project.name

// A groq query to find all access groups the current user is a member of. This
// includes both built in groups like 'administrator' and any custom groups you
// may have created as part of SSO etc.
const groupQuery = '* [_type == "system.group" && identity() in members] {_id}'

const deskStructure = () =>
  client
    .fetch(groupQuery)
    // Convenience: Get the last portion of the group documents '_id' property,
    // since we'd like to just work with the string 'editors' instead of
    // '_.groups.editors'
    .then((docs) => docs.map((doc) => doc._id.split('.').pop()))
    .then((groupNames) => {
      const isAdmin = groupNames.includes('administrator')
      const items = isAdmin
        ? [...defaultItems, S.divider(), ...adminItems]
        : defaultItems
      const title = isAdmin ? `${projectName} (Admin)` : projectName
      return S.list().title(title).items(items)
    })
    .catch(() => {
      // In case of any errors fetching the groups, just return some standard
      // structure. This will only happen if the query cannot be performed for
      // some reason.
      return S.list().title(projectName).items(defaultItems)
    })

export default deskStructure
