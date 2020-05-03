
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Image, Grid } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

import FormPage from './FormPage'
import TextField from 'components/Form/TextField'
import proxy from 'proxy'
import store from 'store'
import trytonLogo from 'assets/img/tryton.svg'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      database: '',
      username: '',
      password: '',
      user: null,
      formMessage: null
    }
    this.onClose = this.onClose.bind(this)
    this.handleStartSession = this.handleStartSession.bind(this)
  }

  handleStartSession = async () => {
    const { username, database, password }  = this.state
    const history =  this.props.history
    const res = await proxy.login(database, username, password)
    if (res) {
      let session = {}
      session['db'] = database
      session['login'] = username
      session['user_id'] = res[0]
      session['session'] = res[1]
      store.set('ctxSession', session)
      history.push(`/${database}/`)
      this.props.handleStartSession()
    } else {
      this.setState({
        formMessage: 'login.invalid_user_password'
      })
    }
  }

  onClose () {
    this.setState({
      openModal: false
    })
  }

  handleChange = (field, value, action) => {
    let toState = {}
    toState[field] = value
    this.setState(toState)
  }

  render () {
    const { formMessage } = this.state

    return (
      <Grid centered columns={1}>
        <Grid.Column mobile={16} tablet={8} computer={4} >
          <Image src={trytonLogo} alt='Tryton Orion' width='300' style={styles.img}/>
          <FormPage
            title='login.start_session'
            formMessage={formMessage}
            handleClose={this.onClose}
          >
            <TextField
              type='text'
              name='database'
              label={<FM id='login.database' />}
              onChange={this.handleChange}
              style={styles.text}
              variant='outlined'
            />
            <TextField
              type='text'
              name='username'
              label={<FM id='login.username' />}
              onChange={this.handleChange}
              variant='outlined'
              style={styles.text}
            />
            <TextField
              name='password'
              label={<FM id='login.password' />}
              variant='outlined'
              type='password'
              style={styles.text}
              onChange={this.handleChange}
            />
            <Grid.Column mobile={16} tablet={8} computer={8} style={styles.field}>
              <Button style={styles.button} onClick={this.handleStartSession}>
                <FM id='login.button_enter' />
              </Button>
            </Grid.Column>
          </FormPage>
        </Grid.Column>
      </Grid>
    )
  }
}

const styles = {
  button: {
    marginTop: 10,
    height: 50,
    width: '100%',
    color: 'white',
    backgroundColor: '#072a44'
  },
  col_text: {
    paddingTop: 5,
    padding: 10,
    justifyContent: 'center'
  },
  col_footer: {
    display: 'flex',
    margin: 10,
    justifyContent: 'center'
  },
  footer: {
    color: '#4a4a4a',
  },
  text: {
    width: '100%',
    backgroundColor: 'white'
  },
  img: {
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  field: {
    padding: '10px 10px 10px 0'
  }
}

export default withRouter(LoginScreen)
