
import tools from 'tools/common'
import store from 'store'

const get_auth = function() {
  const oStore = store.get('ctxSession')
  const val = oStore.login + ':' + oStore.user_id + ':' + oStore.session
  return window.btoa(unescape(encodeURIComponent(val)))
}

async function fetchAPI (api, opts, database) {
  /*
  api :: https://url:port/api
  opts :: {uri, method, body}
  response is Object returned with one attribute called data
  */
  let response, values, route
  let args = {
    method: opts.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  const oStore = store.get('ctxSession')
  if (oStore && oStore.session) {
    args['headers']['Authorization'] = 'Session ' + get_auth()
  }

  if (opts.body) {
    args['body'] = JSON.stringify(opts.body)
  } else {
    opts.body = {}
  }

  if (!database) {
    database = tools.getDatabase()
  }

  route = `${api}${database}${opts.uri}`
  console.log('Request in fecthAPI to : ', route, args)
  try {
    response = await fetch(route, args)
    values = JSON.parse(await response.text())
    return values
  } catch (err) {
    console.log('API Error please check this: ', err)
  }
}

export default fetchAPI
