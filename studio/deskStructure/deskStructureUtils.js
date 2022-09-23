import S from '@sanity/desk-tool/structure-builder'
// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import docTypeObject from '../schemas/docTypeObject'

export const getDocTypeListItem = ({
  type,
  title: listTitle,
  icon: listIcon,
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
