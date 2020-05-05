
import React from 'react'
import { Grid, Icon, Button, Dropdown } from 'semantic-ui-react'
import store from 'store'

import { color } from 'theme'

function NavBar(props) {
  const session = store.get('ctxSession')

  function handleLogout() {
    store.remove('ctxSession')
    props.history.push('/')
  }

  function handleSidebarToggle() {
    props.handleSidebarToggle()
  }

  const username = <p style={styles.username}>{session.user_name}</p>

  return (
    <Grid style={styles.grid} columns='equal'>
      <Grid.Row columns={2}>
        <Grid.Column style={styles.colCompany} largeScreen={11} mobile={10}>
          <h4 style={styles.company}>
            { session && session.company_name }
          </h4>
        </Grid.Column>

        <Grid.Column style={styles.colUser} largeScreen={2} mobile={3}>
          <Dropdown icon='user' trigger={username} style={styles.drop}>
            <Dropdown.Menu>
              <Dropdown.Item text='Log out' onClick={handleLogout}/>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>

        <Grid.Column style={styles.colUserMenu} mobile={3} only='mobile'>
          <Button
            icon
            onClick={handleSidebarToggle}
            style={styles.button}
            >
            <Icon name='bars' />
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const styles = {
  colCompany: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  colUserMenu: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  colUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 'auto',
    color: color.grayDark
  },
  button: {
    backgroundColor: 'transparent'
  },
  grid: {
    width: '100%',
    margin: 0
  },
  drop: {
    display: 'flex',
  },
  company: {
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold'
  },
  username: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: '10px'
  }
}

export default NavBar
