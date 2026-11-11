import React from 'react'

const defaultLabels = {
  plural: 'Elementy',
  singular: 'Element',
}

const defaultCollectionLabels = {
  posts: {
    plural: 'Artykuły',
    singular: 'Artykuł',
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: keyof typeof defaultCollectionLabels
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  indexEnd?: number
  indexStart?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    indexEnd: indexEndFromProps,
    indexStart: indexStartFromProps,
    limit,
    totalDocs,
  } = props

  let indexStart = indexStartFromProps ?? (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = indexEndFromProps ?? (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
    collectionLabelsFromProps ||
    (collection ? defaultCollectionLabels[collection] : undefined) ||
    defaultLabels ||
    {}

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Nie znaleziono żadnych wyników.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `Wyświetlono ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} z ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
    </div>
  )
}
