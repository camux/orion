
import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import store from 'store'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'

import Admin from 'views/Admin/Admin'
import Login from 'views/Login/LoginScreen'
import WebForm from 'views/WebForm/WebForm'
import intl from './i18n/messages'
import tools from 'tools/common'
import proxy from 'proxy'

const hist = createBrowserHistory()

addLocaleData([...en, ...es])

const lang = (navigator.languages && navigator.languages[0]) ||
    navigator.language || navigator.consumerLanguage

console.log('Language => ', lang)
console.log('App version => ', process.env.REACT_APP_VERSION)


class OrionApp extends Component {
  constructor (props) {
    super(props)
    let [messages, localeLang] = intl.getBaseLang()
    this.state = {
      translations: messages,
      locale: localeLang,
      session: store.get('ctxSession')
    }
  }

  componentDidMount () {
    if (this.state.session) {
      this.handleStartSession()
    }
  }

  handleStartSession = async () => {
    // const messages_ = await intl.messages()
    // this.setState({
    //   translations: messages_
    // })
    const res = await proxy.get_preferences()
    console.log('Res . .. . .', res)
  }

  render () {
    const { translations, locale, session } = this.state
    const database = tools.getDatabase()
    return (
      <IntlProvider locale={locale} messages={translations}>
        <Router history={hist}>
          <Switch>
            <Route exact path="/">
            { session && session.user_id?
              <Redirect to={`/${session.db}`} />
              : <Redirect to='/login' />
            }
            </Route>
            <Route path='/:db'>
              < Admin />
            </Route>
            <Route path='/login'>
              <Login handleStartSession={this.handleStartSession}/>
            </Route>
            <Route path={`/${database}/web/:model/form`} component={WebForm} />
            <Redirect from={`/web/${database}/:model/form`} to={`/${database}/web/:model/form`} />
          </Switch>
        </Router>
      </IntlProvider>
    )
  }
}

export default OrionApp
