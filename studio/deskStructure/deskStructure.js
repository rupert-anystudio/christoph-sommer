import S from '@sanity/desk-tool/structure-builder'
import { BiLibrary, BiStar } from 'react-icons/bi'
import { getDocTypeListItem, getListItemItems } from './deskStructureUtils'

export const defaultItems = [
  getListItemItems({
    title: 'Portfolio',
    icon: BiStar,
    items: [
      getDocTypeListItem({
        type: 'publishedText',
        title: 'Texts',
      }),
      getDocTypeListItem({
        type: 'statement',
        title: 'Statements',
      }),
      getDocTypeListItem({
        type: 'speech',
        title: 'Speeches',
      }),
    ],
  }),
  getListItemItems({
    title: 'Library',
    icon: BiLibrary,
    items: [
      getDocTypeListItem({
        type: 'publisher',
        title: 'Publishers',
      }),
      getListItemItems({
        title: 'Magazines',
        items: [
          getDocTypeListItem({
            type: 'magazine',
            title: 'Magazines',
          }),
          getDocTypeListItem({
            type: 'magazineIssue',
            title: 'Magazine Issues',
          }),
        ],
      }),
      getDocTypeListItem({
        type: 'book',
        title: 'Books',
      }),
      getDocTypeListItem({
        type: 'newspaper',
        title: 'Newspapers',
      }),
      getDocTypeListItem({
        type: 'category',
        title: 'Categories',
      }),
      getDocTypeListItem({
        type: 'person',
        title: 'People',
      }),
    ],
  }),
]

export const adminItems = [
  getListItemItems({
    title: 'All',
    items: S.documentTypeListItems(),
  }),
]
