
const validateForm = (action, storeData, storeRequired) => {
  let result = true
  let msg = 'board.missing_required_fields'
  let storeKeys = []
  Object.entries(storeData).forEach(([k, v]) => {
    if (v && v !== '') {
      storeKeys.push(k)
    }
  })

  if (action === 'create') {
    if (storeRequired) {
      result = storeRequired.every(r => storeKeys.includes(r))
    } else {
      msg = 'ok'
    }
  } else {
    for (const fieldReq of storeRequired) {
      const value = storeData[fieldReq]
      if (!value || value === '') {
        console.log('Missing this required field: ', fieldReq)
        result = false
        break
      }
    }
  }
  if (result) {
    msg = 'ok'
  }
  return msg
}

export default validateForm

// for (let [field, value] of Object.entries(storeData)) {
//   if (storeRequired.includes(field) && (!value || value === '')) {
//     result = false
//     console.log('Missing this required field: ', field)
//     break
//   }
// }
