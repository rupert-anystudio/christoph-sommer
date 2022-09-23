import mergedSchemas from './mergedSchemas'

export default mergedSchemas
  .filter((schema) => schema.type === 'document')
  .map(
    ({
      editOnly = false,
      isSingleton = false,
      hasPreview = false,
      hasOrder = false,
      slug = null,
      name,
      title,
      icon,
    }) => ({
      type: name,
      title: title || name,
      slug,
      editOnly,
      hasOrder,
      isSingleton,
      hasPreview,
      icon,
    })
  )
