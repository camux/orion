
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { HeaderView, BodyView, MessageSection, TableContext } from 'components/Board/BoardContext'
import GridBoard from 'components/Grid/GridBoard'
import Modal from 'components/Modal/Modal'
import { clientUpdate, clientAdd, clientRemove } from 'helpers'
import client from 'client'
import { color } from 'theme'
import ctxStore from 'context'

class Board extends Component {
  constructor (props) {
    super(props)
    const { ctxView } = this.props
    this.handleBack = this.handleBack.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.onAcceptRemove = this.onAcceptRemove.bind(this)
    this.onClose = this.onClose.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.resetStore = this.resetStore.bind(this)
    this.onChangeView = this.onChangeView.bind(this)
    this.triggerAction = this.triggerAction.bind(this)
    this.searchRecords = this.searchRecords.bind(this)

    if (this.props.updateStore) {
      this.updateStore = this.props.updateStore
    } else {
      this.updateStore = this.updateStore.bind(this)
    }

    const buttonAdd = { icon: 'add', onClick: this.handleAdd, color: 'blue' }
    const buttonBack = { icon: 'arrow left', onClick: this.handleBack, color: 'teal' }
    const buttonSave = { icon: 'save', onClick: this.handleSave, color: 'blue' }
    // const buttonRemove = { label: 'remove', onClick: this.handleRemove, color: 'red' }

    this.redirect = false
    let list_actions = []
    let form_actions = []
    let sheet_actions = []

    let defaultView = 'list'
    if (props.viewType === 'webform') {
      defaultView = 'webform'
    } else {
      form_actions = [buttonBack]
      if (ctxView.start_view) {
        defaultView = ctxView.start_view
      }
    }

    if (ctxView.form_action_add) {
      list_actions.push(buttonAdd)
    }
    if (ctxView.form_action_save) {
      form_actions.push(buttonSave)
    }

    this.buttonView = {
      list: list_actions,
      form: form_actions,
      sheet: sheet_actions,
      board: [buttonBack],
      webform: []
    }

    // activeRecord: Set all data from api for active record
    let activeRecord = null

    // storeRecord: Keep all data write by user and it that will be send (saved) to api
    this.storeRecord = {}

    this.storeRequired = ctxView['required']

    let buttons = this.buttonView[defaultView]

    this.state = {
      records: [],
      subtitle: null,
      viewType: props.viewType || defaultView, // form, list, sheet
      activeRecord: activeRecord,
      messageCtx: this.resetMessage(),
      buttons: buttons,
      openModal: false,
      msgModal: '',
      titleModal: '',
      buttonsModal: [],
    }
  }

  handleBack () {
    const { viewType } = this.state
    // Reset store
    this.resetStore()
    if (viewType !== 'list') {
      this.setState({
        viewType: 'list',
        activeRecord: null,
        subtitle: null,
        buttons: this.buttonView['list'],
        messageCtx: this.resetMessage()
      })
    }
  }

  handleAdd () {
    const { viewType } = this.state
    this.resetStore()
    if (viewType === 'list') {
      let buttons = this.buttonView['form']
      this.setState({
        viewType: 'form',
        buttons: buttons,
        activeRecord: {},
      })
    }
  }

  async handleFilter (filter) {
    let domain
    let { parentId, parentField, model, records } = this.props

    if (filter) {
      domain = filter
    } else if (parentField && parentId){
      domain = `[('${parentField}', '=', ${parentId})]`
    }

    if (domain) {
      records = await client.proxy.search(model, domain)
      this.setState({records})
    }
  }

  onClose () {
    this.setState({
      openModal: false
    })

    if (this.redirect) {
      // Out of the Web App
      window.location.replace(this.redirect)
    }
  }

  async onAcceptRemove () {
    let { records } = this.state
    const res = await clientRemove(this.props.model, 'remove', this.storeRecord.id)
    if (res.id) {
      delete records[res.id]
      this.setState({
        records: records,
        viewType: 'list',
        openModal: false
      })
    }
  }

  handleRemove () {
    this.setState({
      openModal: true
    })
  }

  async triggerFunction (method) {
    const new_values = await client.proxy.get_method(
        this.props.model, method, this.storeRecord, this.props.context
    )
    if (!new_values) return

    for (const [k, v] of Object.entries(new_values)) {
      this.storeRecord[k] = v
    }
    let newState = {
      activeRecord: this.storeRecord,
    }
    this.setState(newState)
  }

  async triggerAction (action, msg_ok, redirect) {
    let res = await this.handleSave()
    if (res.type === 'msgWarning') {
      return
    }

    if (this.storeRecord.id) {
      const record = await client.proxy.action(this.props.model, this.storeRecord, action)
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
  }

  async handleSave () {
    let res
    let { records, activeRecord } = this.state
    if (this.storeRecord.id) {
      res = await clientUpdate(this.props.model, this.storeRecord, this.storeRequired, activeRecord)
    } else {
      for (let [k, v] of Object.entries(this.storeRecord)) {
        if (v instanceof Map) {
          this.storeRecord[k] = Array.from(v.values())
        }
      }
      res = await clientAdd(this.props.model, this.storeRecord, this.storeRequired)
    }

    if (res.id) {
      this.storeRecord = {id: res.id}
    }
    let newState = {
      messageCtx: { msg: res.msg, type: res.type }
    }

    if (res.record && res.id) {
      let _record = {}
      for (const [attr, value] of Object.entries(res.record)) {
        if (value instanceof Array) {
          let vals = new Map()
          value.forEach(e => { vals.set(e.id, e) })
          _record[attr] = vals
        } else {
          _record[attr] = value
        }
      }
      newState['activeRecord'] = _record

      if (records) {
        newState['records'] = records
      }
    }

    this.setState(newState)
    return res
  }

  resetStore () {
    this.storeRecord = Object.assign({}, this.props.store)
  }

  updateStore (field, value, child, action=false) {
    if (value === undefined) return

    let _activeRecord
    let { activeRecord } = this.state
    if (!child) {
      this.storeRecord[field] = value
      if (activeRecord) {
        _activeRecord = Object.assign(activeRecord, this.storeRecord)
      }
    } else {
      if (!this.storeRecord[child.parentField]) {
        this.storeRecord[child.parentField] = new Map()
      }
      if (!this.storeRecord[child.parentField].get(child.id)) {
        this.storeRecord[child.parentField].set(child.id, {id : child.id})
      }
      let storeChild = this.storeRecord[child.parentField].get(child.id)

      storeChild[field] = value
      this.storeRecord[child.parentField].set(child.id, storeChild)

      let recChild = activeRecord[child.parentField].get(child.id)
      const updatedChild = Object.assign(recChild, storeChild)
      activeRecord[child.parentField].set(child.id, updatedChild)
      _activeRecord = activeRecord
    }

    if (action) {
      console.log('Warning: Action executed in updateStore...!')
      this.handleSave(action)
    }

    const { ctxView } = this.props

    const _field = ctxView['webfields'][field]
    if (value && _field && _field.trigger_function) {
      this.triggerFunction(_field.trigger_function)
    } else if (_activeRecord) {
      let newState = {
        activeRecord: _activeRecord
      }

      if (this.state.messageCtx.msg) {
        newState['messageCtx'] = this.resetMessage()
      }
      this.setState(newState)
    }
  }

  async searchRecords (value) {
    let filtered = {}
    for (const [id, rec] of Object.entries(this.props.records)) {
      const value_ = value.toUpperCase()
      const name_ = rec.name.toUpperCase()
      if (name_.includes(value_)) {
        filtered[id] = rec
      }
    }
    if (value === '') {
      filtered = this.props.records
    }

    this.setState({
      viewType: 'list',
      records: filtered
    })
  }

  updateRecords () {
    const { records } = this.state
    this.setState({ records })
  }

  resetMessage () {
    return {type: null, msg: null}
  }

  _prepareRecord (rec) {
    for (let [key, value] of Object.entries(rec)) {
      if (value instanceof Array) {
        let _listValues = new Map()
        for (const subRec of value) {
          _listValues.set(subRec.id, subRec)
        }
        rec[key] = _listValues
      }
    }
    return rec
  }

  onChangeView (event, view, record) {
    let viewType = 'list'

    if (view === 'update') {
      this.storeRecord = {id: record.id}
      viewType = 'form'
    } else if (view === 'openBoard') {
      viewType = 'board'
    } else if (view === 'calendar') {
      viewType = 'calendar'
    } else if (view === 'sheet') {
      viewType = 'sheet'
    }
    let buttons = this.buttonView[viewType]
    let newState = {
      activeRecord: this._prepareRecord(record),
      viewType: viewType,
      buttons: buttons,
      subtitle: record.name || null,
      messageCtx: this.resetMessage()
    }

    this.setState(newState)
  }

  render () {
    const { subtitle, records, buttons, viewType, activeRecord, messageCtx,
      openModal, msgModal, buttonsModal } = this.state
    let context = ctxStore()
    return (
      <TableContext.Provider
        value={{
          ...this.props,
          subtitle,
          viewType,
          activeRecord,
          records,
          buttons,
          messageCtx,
          styled,
          context: context,
          store: this.store,
          sortable: true,
          handleFilter: this.handleFilter,
          updateStore: this.updateStore,
          triggerAction: this.triggerAction,
          onChangeView: this.onChangeView,
          searchRecords: this.searchRecords,
          updateRecords: (...args) => this.updateRecords(...args)
        }} >
        <GridBoard model={this.props.model} styled={styled}>
          { viewType !== 'webuserform'? <HeaderView/> : null }
          <MessageSection />
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
    fontWeight: 'bold',
    fontSize: 'x-large',
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: 'large',
    color: color.grayDark
  },
  mainBoard: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
  }
}

export default withRouter(Board)
