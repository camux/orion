
import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import Loading from 'components/Tools/Loading'
import getRoutes from 'routes'
import intl from 'i18n/messages'
import proxy from 'proxy'
import tools from 'tools/common'


class MainView extends Component {
  constructor (props) {
    super(props)
    this.state = {
        mobileOpen: true,
        dashRoutes: [],
        menu: null,
        translations: null
    }
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this)
    this.getMenu = this.getMenu.bind(this)
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

  async getMenu(action) {
    let domain = tools.pysonDecoder(action.pyson_domain)
    let action_ctx = tools.pysonDecoder(action.pyson_context || '{}')
    let view_ids = action.view_id ? action.view_id[0] : false
    if (action.views) {
      view_ids = action.views.map((view) => view[0])
    }
    const attributes = {
      'mode': ['tree'],
      'view_ids': view_ids,
      'domain': domain,
      'context': action_ctx,
      'selection_mode': 1,
      'limit': null,
      'row_activate': null,
    }
    const params = [view_ids[0], 'tree']
    const menuScreen = await proxy.model(action.res_model, 'fields_view_get', params)
    const fields_names = Object.keys(menuScreen.fields)
    const records_ids = await proxy.model(action.res_model, 'search', [domain, this.offset, this.limit, this.order])
    const menuRecords = await proxy.read(action.res_model, records_ids, fields_names)
    console.log('menuRecords ', menuRecords)
    return menuRecords
  }

  async componentDidMount() {
    window.addEventListener('resize', this.resizeFunction)

    const prefs = await proxy.get_preferences()
    const action = tools.pysonDecoder(prefs.result.pyson_menu)

    const models = await proxy.load_models(prefs)
    // console.log('Models . .. . .', models)
    const icons = await proxy.model('ir.ui.icon', 'list_icons', [])
    const mapIcons = new Map(icons)
    // console.log('Icons . .. . .', mapIcons)
    const history = await proxy.model('ir.model', 'list_history', [])
    // console.log('History . .. . .', history)
    const searches = await proxy.model('ir.ui.view_search', 'get_search', [])
    const menu = await this.getMenu(action)
    console.log('Searches . .. . .', menu)
    // const messages_ = await intl.messages()
    // const _routes = await this.getRoutes()
    // if (!_routes) {
    //   this.props.history.push('/login')
    //   return
    // }
    // translations: messages_,
    this.setState({
      menu: menu
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFunction)
  }

  render() {
    const { ...rest } = this.props
    const { translations, mobileOpen, menu, dashRoutes } = this.state
    // translations? // : <Loading />
    return (
      <Grid style={styles.grid}>
        <Grid.Row columns={2} style={styles.row}>
          <Grid.Column mobile={8} tablet={3} computer={2} style={styles.col}>
            { menu &&
              <Sidebar
                menu={menu}
                visible={mobileOpen}
                handleSidebarToggle={this.handleSidebarToggle}
                {...rest}
              />
            }
          </Grid.Column>
          <Grid.Column mobile={16} tablet={13} computer={14} floated='right'>
            <Navbar
              routes={menu}
              handleSidebarToggle={this.handleSidebarToggle}
              { ...rest }/>
              <Switch>
                { dashRoutes }
              </Switch>
            <Footer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
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

export default withRouter(MainView)
