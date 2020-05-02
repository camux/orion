
import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

import logo from 'assets/img/logo.png'

const DashSidebar = ({ ...props }) => {
  const { routes, visible } = props

  const menus = routes.map((route, key) => {
    return (
      <Menu.Item
        key={key}
        as={NavLink}
        to={route.layout}
      >
        <Icon name={ route.icon } />
          <FM id={route.name} />
      </Menu.Item>
    )
  })

  return (
    <Sidebar.Pushable as={Segment} style={styles.pushable}>
      <Sidebar as={Menu}
        icon='labeled'
        style={styles.sidebarBody}
        inverted
        vertical
        animation='overlay'
        visible={visible}
        >
        <img src={logo} alt='logo' style={styles.img}/>
        { menus }
      </Sidebar>
    </Sidebar.Pushable>
  )
}

const styles = {
  img: {
    width: 150,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15
  },
  sidebarBody: {
    backgroundColor: '#282e30',
    // overflow: 'auto',
    width: '100%',
    overflowScrolling: 'touch',
    display: 'table'
  },
  pushable: {
    display: 'contents',
  }
}

export default withRouter(DashSidebar)
