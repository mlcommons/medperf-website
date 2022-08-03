import defaultResolve from 'part:@sanity/base/document-actions';

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props).filter((action) => action.name !== 'DeleteAction')];
}
