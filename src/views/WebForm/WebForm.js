
import React, { useEffect, useState } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { IntlProvider } from 'react-intl'

import Loading from 'components/Tools/Loading'
import Board from 'components/Board/Board'
import proxy from 'proxy'
import tools from 'tools/common'
import intl from 'i18n/messages'


function WebForm (props) {
  let [, localeLang] = intl.getBaseLang()
  const [formRoutes, setFormRoutes] = useState([])
  const [translation, setTranslation] = useState(null)

  async function getTranslation() {
    const messages_ = await intl.messages()
    setTranslation(messages_)
  }

  async function getFormRoutes() {
    const { model } = props.match.params
    const formView = await proxy.get_form(model)
    const database = tools.getDatabase()

    const webFormRoute = [
      <Route key={model}
        path={`/${database}/web/${model}/form`}
        render={
          () => <Board viewType='webform' ctxView={formView} model={model}/>
        }/>
    ]

    setFormRoutes(webFormRoute)
  }

  useEffect(() => {
    getFormRoutes()
    getTranslation()
  })

  return (
    translation?
      <IntlProvider locale={localeLang} messages={translation}>
        <Grid centered style={styles.grid}>
          <Switch>
            { formRoutes }
          </Switch>
        </Grid>
      </IntlProvider>
    : <Loading />
  )
}

const styles = {
  grid: {
    margin: 0
  }
}

export default withRouter(WebForm)
