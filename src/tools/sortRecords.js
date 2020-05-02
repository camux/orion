
const sortRecords = (records, orderField, _orderDirection) => {
  records = records.sort(function (a, b) {
    let valueA = a[orderField]
    let valueB = b[orderField]
    // Use toUpperCase() to ignore character casing
    if (typeof valueA === 'string') {
      valueA = valueA.toUpperCase()
      valueB = valueB.toUpperCase()
    } else if (valueA instanceof Object && valueA['name']) {
      valueA = valueA['name'].toUpperCase()
      valueB = valueB['name'].toUpperCase()
    }

    if (valueA > valueB) {
      return 1
    }
    if (valueA < valueB) {
      return -1
    }
    // Is equal
    return 0
  })
  if (_orderDirection === 'ascending') {
    return records
  } else {
    return records.reverse()
  }
}

export default sortRecords
