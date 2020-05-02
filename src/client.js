
import Proxy from 'proxy'
const env = require('./env')


class Client {
  constructor (options) {
    this.proxy = new Proxy(options)
  }
}

console.log(' ENV API  > > > > > > ',  env.api)
const client = new Client(env)

export default client
