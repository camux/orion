
import store from 'store'

function ctxStore () {
  const session = store.get('ctxSession')
  let ctx = {}
  if (session) {
    ctx = {
      company: session.company,
      user: session.user,
      currency: session.currency,
      timezone: session.timezone,
    }
  }
  return ctx
}

export default ctxStore
