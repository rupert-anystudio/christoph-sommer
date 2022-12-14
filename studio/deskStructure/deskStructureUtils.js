import S from '@sanity/desk-tool/structure-builder'
// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import docTypeObject from '../schemas/docTypeObject'

const returnMenuItemsFromOderings = (orderings = []) =>
  orderings.reduce((acc, curr) => {
    const { field, title: fieldTitle } = curr
    if (!field) return acc
    const title = fieldTitle || field
    return [
      ...acc,
      S.orderingMenuItem({
        title: [title, 'ascending'].join(', '),
        by: [{ field, direction: 'asc' }],
      }),
      S.orderingMenuItem({
        title: [title, 'descending'].join(', '),
        by: [{ field, direction: 'desc' }],
      }),
    ]
  }, [])

export const getDocTypeListItem = ({
  type,
  title: listTitle,
  icon: listIcon,
  orderings = [],
}) => {
  const docType = docTypeObject[type]
  if (!docType) return null
  const { isSingleton, hasOrder, title: docTitle, icon: docIcon } = docType
  const title = listTitle || docTitle || type
  const icon = listIcon || docIcon
  if (isSingleton) {
    // Document type is a singleton
    return S.listItem()
      .title(title)
      .icon(icon)
      .child(S.document().id(type).schemaType(type).documentId(type))
  }
  if (hasOrder) {
    // Ordered list of Document type
    return orderableDocumentListDeskItem({
      type,
      title,
      icon,
    })
  }
  // Normal list of Document type
  return S.documentTypeListItem(type).title(title).icon(icon)
}

export const getListItemItems = ({ title, items = [], icon }) =>
  S.listItem().title(title).icon(icon).child(S.list().title(title).items(items))

export const getDocTypesListItem = ({
  types,
  title: listTitle,
  icon,
  orderings = [],
}) => {
  const title = listTitle || 'No Title'
  const menuItems = returnMenuItemsFromOderings(orderings)
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentList()
        .title(title)
        .filter('_type in $types')
        .params({ types })
        .menuItems(menuItems)
    )
}
