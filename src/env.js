
let apiHost = process.env.REACT_APP_ORION_API_HOST
let apiPort = process.env.REACT_APP_ORION_API_PORT

const api_key = process.env.REACT_APP_TRYTON_API_KEY

const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_UPLOAD_URL

let http = 'https'

console.log('running on :', process.env.REACT_APP_ENV)
if (process.env.REACT_APP_ENV === 'development') {
  http = 'http'
}

console.log('Api connection :', apiHost, apiPort)
let api = `${http}://${apiHost}:${apiPort}/`
// let api = `${http}://192.168.1.77:${apiPort}/`

module.exports = {
  api,
  api_key,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL
}
