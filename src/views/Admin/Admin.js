
import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import Loading from 'components/Tools/Loading'
import getRoutes from 'routes'
import intl from 'i18n/messages'


class Dashboard extends Component {
  state = {
      mobileOpen: true,
      dashRoutes: [],
      routes: [],
      translations: null
  }

  handleSidebarToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: true })
    } else {
      this.setState({ mobileOpen: false })
    }
  }

  async getRoutes() {
    const routes = await getRoutes()
    if (!routes) {
      return
    }

    const dashRoutes = routes.map((prop, key) => {
      return (
        <Route
          path={prop.layout}
          render={() => prop.component}
          key={key}
        />
      )
    })

    return [routes, dashRoutes]
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resizeFunction)

    const messages_ = await intl.messages()
    const _routes = await this.getRoutes()
    if (!_routes) {
      this.props.history.push('/login')
      return
    }
    this.setState({
      translations: messages_,
      routes: _routes[0],
      dashRoutes: _routes[1]
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction)
  }

  render() {
    const { ...rest } = this.props
    const { translations, mobileOpen, routes, dashRoutes } = this.state
    return (
      translations?
          <Grid style={styles.grid}>
            <Grid.Row columns={2} style={styles.row}>
              <Grid.Column mobile={8} tablet={3} computer={2} style={styles.col}>
                <Sidebar
                  routes={routes}
                  visible={mobileOpen}
                  handleSidebarToggle={this.handleSidebarToggle}
                  {...rest}
                />
              </Grid.Column>
              <Grid.Column mobile={16} tablet={13} computer={14} floated='right'>
                <Navbar
                  routes={routes}
                  handleSidebarToggle={this.handleSidebarToggle}
                  { ...rest }/>
                  <Switch>
                    { dashRoutes }
                  </Switch>
                <Footer />
              </Grid.Column>
            </Grid.Row>
          </Grid>
    : <Loading />
    )
  }
}

const styles = {
  grid: {
    top: '0',
    height: '100vh'
  },
  row: {
    paddingBottom: 0
  },
  col: {
    height: '100%',
    display: 'table',
    position: 'absolute'
  }
}

export default withRouter(Dashboard)
