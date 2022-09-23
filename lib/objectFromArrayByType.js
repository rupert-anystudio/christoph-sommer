const objectFromArrayByType = (arr = []) => arr
  .reduce((acc, curr) => {
    const type = curr.type
    if (!type) return acc
    return {
      ...acc,
      [type]: curr
    }
  }, {})

export default objectFromArrayByType