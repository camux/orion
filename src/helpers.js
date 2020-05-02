
import client from 'client'
import validateForm from './tools/validateForm'

export const clientRemove = async (model, recId) => {

  const toRemove = {
    ids: [recId],
    model: model,
  }
  const record = await client.proxy.remove(toRemove)
  return record
}

export const clientUpdate = async (model, storeData, storeRequired, record) => {
  let res = {
    record: {},
    msg: 'board.record_saved',
    type: 'msgInfo'
  }
  let _storeData
  if (record) {
    let store = {}
    for (const sr of storeRequired) {
      store[sr] = record[sr]
    }
    _storeData = {...store, ...storeData}
  } else {
    _storeData = storeData
  }

  let isValid = await validateForm('update', _storeData, storeRequired)
  if (isValid === 'ok') {
    const rec_id = storeData.id
    delete storeData.id
    let storeJson = {}
    for (const [k, v] of Object.entries(storeData)) {
      if (v instanceof Map) {
        storeJson[k] = Array.from(v.values())
      } else {
        storeJson[k] = v
      }
    }
    const data = {
      id: rec_id,
      model: model,
      record_data: storeJson
    }


    const record = await client.proxy.save(data)
    if (record) {
      res['record'] = record
      res['id'] = record.id
    }
  } else {
    res['msg'] = isValid
    res['type'] = 'msgWarning'
  }
  return res
}

export const clientAdd = async (model, storeData, storeRequired) => {
  let res = {
    record: {},
    msg: 'board.record_created',
    type: 'msgInfo'
  }

  const isValid = await validateForm('create', storeData, storeRequired)
  if (isValid === 'ok') {
    const record = await client.proxy.create(model, storeData)
    res['record'] = record
    res['id'] = record.id
  } else {
    res['msg'] = isValid
    res['type'] = 'msgWarning'
  }

  return res
}

export async function searchSelection(model, domain) {
  const records = await client.proxy.search_selection(model, domain)
  const _items = records.map(function(r) {
    return { key: r.id, value: r.id, text: r.rec_name || r.name }
  })
  return _items
}
