
import tools from 'tools/common'

async function fetchAPI (api, opts, database) {
  /*
  api :: https://url:port/api
  opts :: {uri, method, body}
  response is Object returned with one attribute called data
  */
  let response, values, route //, database
  let args = {
    method: opts.method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (opts.token) {
    args['headers']['authorization'] = `Bearer ${opts.token}`
  }

  if (opts.body) {
    args['body'] = JSON.stringify(opts.body, (k, v) => v === undefined ? null : v)
  } else {
    opts.body = {}
  }

  if (!database) {
    database = tools.getDatabase()
  }
  route = `${api}${database}${opts.uri}`

  // console.log('Request in fecthAPI to : ', route, args)
  try {
    response = await fetch(route, args)
    values = JSON.parse(await response.text())
    return values
  } catch (err) {
    console.log('API Error please check this: ', err)
  }
}

export default fetchAPI
