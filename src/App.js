
import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
import store from 'store'
import en from 'react-intl/locale-data/en'
import es from 'react-intl/locale-data/es'

import MainView from 'views/Main/MainView'
import Login from 'views/Login/LoginScreen'
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
      session: store.get('ctxSession'),
      preferences: null,
      locale: localeLang,
    }
  }

  componentDidMount () {
    if (this.state.session) {
      this.handleStartSession()
    }
  }

  handleStartSession = async () => {
    // const messages_ = await intl.messages()
    // const prefs = await proxy.get_preferences()
    // console.log('Prefs . .. . .', prefs)
    // this.setState({
    //   preferences: prefs
    // })
  }

  render () {
    const { translations, locale, session, preferences } = this.state
    const database = tools.getDatabase()
    return (
      <IntlProvider locale={locale} messages={translations}>
        <Router history={hist}>
          <Switch>
            <Route exact path="/">
            { session && session.user_id?
              <Redirect to={`/${session.db}`} />
              :
              <Login handleStartSession={this.handleStartSession}/>
            }
            </Route>
            <Route path='/:db'>
              < MainView preferences={preferences}/>
            </Route>
          </Switch>
        </Router>
      </IntlProvider>
    )
  }
}

export default OrionApp
