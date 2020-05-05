
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Icon, Menu, Segment, Sidebar, Accordion } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

import logo from 'assets/img/tryton-white.svg'

class DashSidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
    }
    this.handleClick = this.handleClick.bind(this)
    this.getMenuTree = this.getMenuTree.bind(this)
    // const { menu, visible } = props
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState({ activeIndex: newIndex })
  }

  getMenuTree = (activeIndex) => {
    const menuTree = this.props.menu.map((menuItem, key) => {
      const _getItem = (item, index) => {
        let subitems = null
        let content = null
        if (item.childs) {
          subitems = []
          for (const i of item.childs) {
            subitems.push(_getItem(i, i))
          }
          content = (<Accordion.Content> { subitems } </Accordion.Content>)
          // return subelements
        }

        return (
          <Accordion.Title
            key={index}
            active={false}
            index={index}
            onClick={this.handleClick}
          >
            { item.childs && <Icon name='dropdown' /> }
            { item.name || 'myChild-' + index }

            { content }
          </Accordion.Title>
        )
      }
      return _getItem(menuItem, menuItem.id)
    })
    return menuTree
  }

  render () {
    const { activeIndex } = this.state
    return (
      <Sidebar.Pushable as={Segment} style={styles.pushable}>
        <Sidebar as={Menu}
          icon='labeled'
          style={styles.sidebarBody}
          inverted
          vertical
          animation='overlay'
          visible={this.props.visible}
          >
          <img src={logo} alt='logo' style={styles.img}/>
          <Accordion inverted>
            { this.getMenuTree(activeIndex) }
          </Accordion>
        </Sidebar>
      </Sidebar.Pushable>
    )
  }
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
