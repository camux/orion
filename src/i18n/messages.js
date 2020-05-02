
import en from './en'
import es from './es'
import client from 'client'

let locale = (navigator.languages && navigator.languages[0]) ||
    navigator.language || navigator.consumerLanguage || 'en'


// const enCtx = ['en', 'en-US', 'en-us', 'en-AU', 'en-au', 'en-gb', 'en-GB']
const esCtx = ['es', 'es-ES', 'es-es', 'es-ES', 'es-US', 'es-419', 'es-co',
    'es-CO' ,'es-AR', 'es-pr', 'es-PR', 'es-pe', 'es-PE']


const getBaseLang = function () {
  let localeLang, langBase
  if (esCtx.includes(locale)) {
    langBase = es
    localeLang = 'es'
  } else {
    langBase = en
    localeLang = 'en'
  }
  return [langBase, localeLang]
}


// Read all languages and create base language
const messages = async function () {
  let localeLang, langBase
  if (esCtx.includes(locale)) {
    langBase = es
    localeLang = 'es'
  } else {
    langBase = en
    localeLang = 'en'
  }

  const langs = await client.proxy.get_translations()
  if (!langs) return langBase

  // First set all english translations as default
  for (let [k, v] of Object.entries(langs)) {
    if (k === 'en') {
      Object.assign(langBase, v)
    }
  }

  let langEn = langBase
  let langEs = langBase

  for (let [k, v] of Object.entries(langs)) {
    if (k === 'es') {
      Object.assign(langEs, v)
      if (localeLang === 'es') {
        Object.assign(langEn, v)
      }
    }
  }

  let _messages
  if (localeLang === 'en') {
    _messages = langEn
  } else {
    _messages = langEs
  }

  return _messages
}

export default {messages, getBaseLang}
