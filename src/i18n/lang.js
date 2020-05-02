
const locale = (navigator.languages && navigator.languages[0]) ||
    navigator.language || navigator.consumerLanguage || 'en'

const options = {
  'en': ['en', 'en-US', 'en-us', 'en-gb', 'en-GB'],
  'es': ['es', 'es-es', 'es-ES', 'es-US', 'es-419', 'es-co', 'es-CO', 'es-ar', 'es-AR', 'es-pr', 'es-PR', 'es-pe', 'es-PE'],
}

let lang = 'en'

for (var lg of Object.keys(options)) {
  if (options[lg].includes(locale)) {
    lang = lg
    break
  }
}

export default lang
