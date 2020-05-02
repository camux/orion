
import fetchAPI from 'fetch_api'
import store from 'store'

export default class Proxy {
  constructor (options) {
    this.api = options.api
  }

  async save (data) {
    data['context'] = store.get('ctxSession')
    let opts = {
      method: 'PUT',
      uri: `/save`,
      body: data,
    }

    return await fetchAPI(this.api, opts)
  }

  async saveMany (data) {
    data['context'] = store.get('ctxSession')
    let opts = {
      method: 'PUT',
      uri: `/save_many`,
      body: data,
    }

    return await fetchAPI(this.api, opts)
  }

  async remove (data) {
    data['context'] = store.get('ctxSession')
    let opts = {
      method: 'DELETE',
      uri: `/delete`,
      body: data,
    }

    return await fetchAPI(this.api, opts)
  }

  async action (model, record, action) {
    const context = store.get('ctxSession')
    let opts = {
      method: 'PUT',
      uri: `/action`,
      body: {model, record, action, context}
    }

    return await fetchAPI(this.api, opts)
  }

  async search (model, domain, selection) {
    let opts = {
      method: 'GET',
      uri: `/search?model=${model}&domain=${domain}&selection=${selection}`,
    }

    return await fetchAPI(this.api, opts)
  }

  async search_selection (model, domain, selection) {
    let opts = {
      method: 'GET',
      uri: `/search_selection?model=${model}&domain=${domain}&selection=${selection}`,
    }

    return await fetchAPI(this.api, opts)
  }

  async search_record (model, clause) {
    let opts = {
      method: 'GET',
      uri: `/search_record?model=${model}&clause=${clause}`,
    }

    return await fetchAPI(this.api, opts)
  }

  async dash_reports () {
    const session = store.get('ctxSession')
    let opts = {
      method: 'GET',
      uri: `/dash_reports?user=${session.user}`,
    }

    return await fetchAPI(this.api, opts)
  }

  async report_data (report_id) {
    const session = store.get('ctxSession')
    const ctx = JSON.stringify(session)
    let opts = {
      method: 'GET',
      uri: `/report_data?id=${report_id}&context=${ctx}`,
    }

    return await fetchAPI(this.api, opts)
  }

  async create (model, data) {
    const ctx = store.get('ctxSession')
    let toCreate = {
      record: data,
      model: model,
      context: ctx
    }

    let opts = {
      method: 'POST',
      uri: `/create`,
      body: toCreate
    }

    return await fetchAPI(this.api, opts)
  }

  async login (database, user, passwd) {
    let opts = {
      method: 'GET',
      uri: `/login?user=${user}&passwd=${passwd}`
    }
    return await fetchAPI(this.api, opts, database)
  }

  async get_form(name) {
    let opts = {
      method: 'GET',
      uri: `/webform?model=${name}`
    }

    return await fetchAPI(this.api, opts)
  }

  async get_sheet(model, args) {
    const _args = JSON.stringify(args)
    let opts = {
      method: 'GET',
      uri: `/sheet?model=${model}&args=${_args}`
    }

    return await fetchAPI(this.api, opts)
  }

  async get_models() {
    const session = store.get('ctxSession')
    if (session) {
      let opts = {
        method: 'GET',
        uri: `/models?user=${session.user}`
      }

      return await fetchAPI(this.api, opts)
    }
  }

  async get_translations() {
    let opts = {
      method: 'GET',
      uri: `/translations`
    }

    return await fetchAPI(this.api, opts)
  }

  async get_method(model, method, args, ctxRecord) {
    const _args = JSON.stringify(args)
    const ctxUser = store.get('ctxSession')
    const ctx = JSON.stringify({...ctxUser, ...ctxRecord })
    let uri = `/model_method?model=${model}&method=${method}&context=${ctx}`
    if (args) {
      uri = uri + `&args=${_args}`
    }
    let opts = {
      method: 'GET',
      uri: uri
    }

    return await fetchAPI(this.api, opts)
  }

}
