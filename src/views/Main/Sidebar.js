
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Icon, Menu, Segment, Sidebar, Accordion } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

import logo from 'assets/img/tryton-white.svg'

class DashSidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.getMenuTree = this.getMenuTree.bind(this)
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    console.log()
    if (activeIndex.includes(index)) {
      activeIndex.splice(activeIndex.indexOf(index), 1)
    } else {
      activeIndex.push(index)
    }
    this.setState({ activeIndex: activeIndex })
  }

  runAction = () => {
    console.log('Run Action.....')
  }

  getMenuTree = (activeIndex) => {
    const menuTree = this.props.menu.map((menuItem, key) => {
      let onClick
      const _getItem = (item, index, styleX) => {
        let subitems = null
        let content = null
        if (item.childs) {
          subitems = []
          for (const i of item.childs) {
            subitems.push(_getItem(i, i))
          }
          onClick = this.handleClick
        } else {
          onClick = this.runAction
        }

        return [
          <Accordion.Title
            key={index}
            active={activeIndex.includes(index)}
            index={index}
            onClick={onClick}
            style={styleX || styles.item}
          >
            { item.childs && <Icon name='dropdown' /> }
            { item.name || 'myChild-' + index }
          </Accordion.Title>,
          <Accordion.Content key={key} active={activeIndex.includes(index)}>
            { subitems }
          </Accordion.Content>
        ]
      }
      return _getItem(menuItem, menuItem.id, styles.main_item)
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
          <Accordion inverted exclusive={false} >
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
  },
  item: {
    display: 'flex',
    paddingLeft: 20
  },
  main_item: {
    display: 'flex',
    paddingLeft: 20,
    fontWeight: 'bold',
    borderTop: '0.5px solid #373737',
  }
}

export default withRouter(DashSidebar)
