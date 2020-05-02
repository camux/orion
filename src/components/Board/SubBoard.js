
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { HeaderView, BodyView, TableContext } from 'components/Board/BoardContext'
import GridBoard from 'components/Grid/GridBoard'
import Modal from 'components/Modal/Modal'
import { clientRemove } from 'helpers'
import client from 'client'
import { color } from 'theme'
import ctxStore from 'context'

const viewTypes = {
    update: 'form',
    openBoard: 'board',
    calendar: 'calendar',
    sheet: 'sheet'
}

class SubBoard extends Component {
  constructor (props) {
    super(props)
    let { ctxView, viewType, records } = this.props

    this.handleBack = this.handleBack.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.onAcceptRemove = this.onAcceptRemove.bind(this)
    this.onClose = this.onClose.bind(this)
    this.updateStore = this.updateStore.bind(this)
    this.onChangeView = this.onChangeView.bind(this)
    this.triggerAction = this.triggerAction.bind(this)
    this.get_defaults = this.get_defaults.bind(this)

    const buttonAdd = { icon: 'add', onClick: this.handleAdd, color: 'blue' }
    const buttonBack = { icon: 'arrow left', onClick: this.handleBack, color: 'teal' }
    const buttonSave = { icon: 'save', onClick: this.handleSave, color: 'blue' }

    this.redirect = false
    let list_actions = []
    let form_actions = [buttonBack]
    let defaultView = 'list'

    this.nextId = -1
    if (ctxView.form_action_add) {
      list_actions.push(buttonAdd)
    }
    if (ctxView.form_action_save) {
      form_actions.push(buttonSave)
    }

    this.buttonView = {
      list: list_actions,
      form: form_actions,
      board: [buttonBack],
    }

    this.storeRequired = ctxView['required']

    this.state = {
      subtitle: null,
      viewType: viewType || defaultView,
      records: records,
      activeRecord: null,
      buttons: this.buttonView[defaultView],
      openModal: false,
      msgModal: '',
      titleModal: '',
      buttonsModal: [],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.records !== this.props.records) {
      let _records = []
      if (this.props.records) {
        for (let r of this.props.records.values()) {
          _records.push(r)
        }
        this.setState({records: _records})
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
     if (nextProps.records !== prevState.records) {
       return { records: nextProps.records}
    } else {
      return []
    }
  }

  handleBack () {
    if (this.state.viewType !== 'list') {
      this.setState({
        viewType: 'list',
        activeRecord: null,
        subtitle: null,
        buttons: this.buttonView['list'],
      })
    }
  }

  get_defaults () {
    this.nextId = this.nextId - 1
    let record = { id: this.nextId }
    const _fields = this.props.ctxView['webfields']
    for (const [k, v] of Object.entries(_fields)) {
      if (v.default) {
        record[k] = v.default
      }
    }
    return record
  }

  handleAdd () {
    const activeRecord = this.get_defaults()

    if (this.state.viewType === 'list') {
      let buttons = this.buttonView['form']
      this.setState({
        viewType: 'form',
        buttons: buttons,
        activeRecord: activeRecord
      })
    }
  }

  onClose () {
    this.setState({ openModal: false })
    if (this.redirect) {
      // Out of the Web App
      window.location.replace(this.redirect)
    }
  }

  async onAcceptRemove (rec) {
    const { fieldName, model, records } = this.props
    if (rec.id > 0) {
      await clientRemove(model, rec.id)
    }
    records.delete(rec.id)
    this.props.updateStore(fieldName, records)
    this.setState({records})
  }

  async triggerAction (action, msg_ok, redirect) {
    const { activeRecord } = this.state

    if (!activeRecord.id) {
      // First create the record
      await this.handleSave()
    }

    if (!activeRecord.id) {
      return
    }

    const record = await client.proxy.action(this.props.model, activeRecord, action)
    if (record.id) {
      let newState = {
        activeRecord: record,
      }
      if (msg_ok) {
        newState['openModal'] = true
        newState['buttonsModal'] = ['close']
        newState['msgModal'] = msg_ok
        if (redirect) {
          this.redirect = redirect
        }
      }
      this.setState(newState)
    }
  }

  async handleSave () {
    let { records, activeRecord } = this.state
    records.set(activeRecord.id, activeRecord)
    this.props.updateStore(this.props.fieldName, records)
  }

  async updateStore (fieldName, value, child, action=false) {
    let { activeRecord } = this.state
    const _field = this.props.ctxView['webfields'][fieldName]
    if (activeRecord) { // only works in form
      activeRecord[fieldName] = value
      if (value && _field && _field.trigger_function) {
        activeRecord = await this.triggerFunction(_field.trigger_function, activeRecord)
      }
      this.setState({activeRecord})
    } else if (child) {
      const childData = {
        id: child.id,
        parentField: this.props.fieldName,
      }
      this.props.updateStore(fieldName, value, childData)
    }
  }

  async triggerFunction (method, activeRecord) {
    const new_values = await client.proxy.get_method(
      this.props.model, method, activeRecord, this.props.parentRecord
    )
    for (const [k, v] of Object.entries(new_values)) {
      activeRecord[k] = v
    }
    return activeRecord
  }

  async onChangeView (event, action, record) {
    let viewType
    if (action === 'remove') {
      return await this.onAcceptRemove(record)
    } else {
      viewType = viewTypes[action]
    }

    this.setState({
      activeRecord: record,
      viewType: viewType,
      buttons: this.buttonView[viewType],
      subtitle: record.name || null,
    })
  }

  render () {
    const { subtitle, records, buttons, viewType, activeRecord, openModal,
      msgModal, buttonsModal } = this.state

    return (
      <TableContext.Provider
        value={{ ...this.props,
          subtitle,
          viewType,
          activeRecord,
          records,
          buttons,
          styled,
          store: this.store,
          context: ctxStore(),
          orderable: false,
          updateStore: this.updateStore,
          triggerAction: this.triggerAction,
          onChangeView: this.onChangeView,
        }} >
          <GridBoard model={this.props.model} styled={styled}>
            <HeaderView/>
            <BodyView />
          </GridBoard>
        <Modal
          open={openModal}
          onClose={this.onClose}
          buttons={buttonsModal}
          titleModal={null}
          msgModal={msgModal}
          onAccept={this.onAcceptRemove} />
      </TableContext.Provider>
    )
  }
}

const styled = {
  title: {
    fontWeight: 'Bold',
    fontSize: 'medium'
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: 'large',
    color: color.grayDark
  },
  mainBoard: {
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    marginBottom: 20,
    marginTop: 20,
    border: 'dashed',
    borderWidth: 1,
    borderColor: 'rgb(175, 175, 175)',
    display: 'table'
  }
}

export default withRouter(SubBoard)
