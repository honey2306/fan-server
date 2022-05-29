module.exports.filterField = (needArray, fields) => {
  const newArray = []
  needArray.forEach(item => {
    const tmpObj = {}
    fields.forEach(field => {
      item[ field ] && (tmpObj[ field ] = item[ field ])
    })
    newArray.push(tmpObj)
  })
  return newArray
}
