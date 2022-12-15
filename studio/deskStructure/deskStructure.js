import S from '@sanity/desk-tool/structure-builder'
import { BiDesktop, BiLibrary, BiStar } from 'react-icons/bi'
import {
  getDocTypeListItem,
  getDocTypesListItem,
  getListItemItems,
} from './deskStructureUtils'

export const defaultItems = [
  getListItemItems({
    title: 'Site',
    icon: BiDesktop,
    items: [
      getDocTypeListItem({
        type: 'siteSettings',
        title: 'General',
      }),
      getDocTypeListItem({
        type: 'aboutPage',
        title: 'About',
      }),
      getDocTypeListItem({
        type: 'imprintPage',
        title: 'Imprint',
      }),
      getDocTypeListItem({
        type: 'privacyPage',
        title: 'Data Privacy',
      }),
    ],
  }),
  getDocTypeListItem({
    type: 'annoucement',
    title: 'Annoucements',
  }),
  getListItemItems({
    title: 'Portfolio',
    icon: BiStar,
    items: [
      getDocTypesListItem({
        types: ['project', 'publishedText', 'statement', 'speech'],
        title: 'All',
        orderings: [
          { field: 'publishedAt', title: 'Published At', direction: 'desc' },
          { field: '_updatedAt', title: 'Last edited', direction: 'desc' },
          { field: '_createdAt', title: 'Created', direction: 'desc' },
          // { field: '_createdAt', title: 'Creation Date' },
        ],
      }),
      getDocTypeListItem({
        type: 'project',
        title: 'Projects',
      }),
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
            title: 'Issues',
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
