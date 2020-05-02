
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

const hist = createBrowserHistory()

addLocaleData([...en, ...es])

const lang = (navigator.languages && navigator.languages[0]) ||
    navigator.language || navigator.consumerLanguage

console.log('Language => ', lang)
console.log('App version => ', process.env.REACT_APP_VERSION)


class AppWeb extends Component {
  constructor (props) {
    super(props)
    let [messages, localeLang] = intl.getBaseLang()
    this.state = {
      translations: messages,
      locale: localeLang,
      session: store.get('ctxSession')
    }
  }

  handleStartSession = async () => {
    const messages_ = await intl.messages()
    this.setState({
      translations: messages_
    })
  }

  render () {
    const { translations, locale, session } = this.state
    const database = tools.getDatabase()
    return (
      <IntlProvider locale={locale} messages={translations}>
        <Router history={hist}>
          <Switch>
            <Route exact path="/">
            { session && session.user?
              <Redirect to={`/${session.db}/admin`} />
              : <Redirect to='/login' />
            }
            </Route>
            <Route path='/:db/admin'>
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

export default AppWeb
