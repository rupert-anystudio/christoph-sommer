import defaultResolve, {
  PublishAction,
  DiscardChangesAction,
} from 'part:@sanity/base/document-actions'
import docTypeObject from './schemas/docTypeObject'

const editOnly = [PublishAction, DiscardChangesAction]

export default function documentActions(props) {
  if (docTypeObject[props.type]?.editOnly) return editOnly
  return defaultResolve(props)
}
