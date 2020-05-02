
import React, { Component } from 'react'
import { FormattedMessage as FM } from 'react-intl'
import { Icon, Table, Button } from 'semantic-ui-react'

import CheckboxField from 'components/Form/CheckboxField'
import Circle from './Circle'
import ButtonLink from './ButtonLink'
import tools from 'tools/common'
import { color }  from 'theme'

class BodyTable extends Component {
  constructor (props) {
    super(props)
    const { webtree, webfields } = this.props.ctxView
    this.actionButton = this.actionButton.bind(this)
    this.getCell = this.getCell.bind(this)
    this.TableRowNormal = this.TableRowNormal.bind(this)
    this.cellButtonStart = []
    this.cellButtonEnd = []
    if (this.props.cellButtons) {
      for (const cb of this.props.cellButtons) {
        if (cb['action'] === 'update') {
          this.cellButtonStart.push(cb)
        } else {
          this.cellButtonEnd.push(cb)
        }
      }
    }
    this.state = {
      treeView: webtree,
      fields: webfields
    }
  }

  actionButton (rec, value, index) {
    return (
      <Table.Cell key={index} style={styles.headerButton}>
        <Button icon style={{backgroundColor: 'rgba(0,0,0,0.0)'}}>
          <Icon name={value.icon}
            onClick={(event) => this.props.onChangeView(event, value.action, rec)}
            style={{color: value.color, fontSize: 18}}
          />
        </Button>
      </Table.Cell>
    )
  }

  getCell (rec, field, key, empty, font) {
    const { name, type, translate, width, data_source } = field
    let align = 'left'
    let padding = '1%'
    let value = rec[name]
    if (empty) {
      value = ''
    } else if (type === 'date') {
      if (value) {
        value = tools.fmtDate(value, true)
      } else {
        value = ''
      }
      align = 'center'
    } else if (type === 'datetime') {
      if (value) {
        value = tools.fmtDatetime(value, true)
      } else {
        value = ''
      }
      align = 'center'
    } else if (type === 'number' && value) {
      value = value.toLocaleString('es', {useGrouping:true})
      align = 'right'
    } else if (type === 'boolean') {
      align = 'center'
      value = <CheckboxField recId={rec.id} name={name} {...this.props}
        value={value} onChange={this.props.updateStore}
        />
    } else if (type === 'many2one') {
      if (rec[field['name']]) {
        value = rec[field['name']].name
      } else {
        value = ''
      }
    } else if (type === 'circle') {
      align = 'center'

      if (field['color']) {
        const color_ctx = field['color']
        value = <Circle color={color_ctx} value={value}/>
      }
      padding = '0.5%'
    } else if (type === 'link') {
      return <ButtonLink key={key} value={value} icon='chat' data_source={data_source}/>
    }

    let style = stylesCtx(width, align, font, padding)

    if (translate && type === 'char') {
      return (
        <FM id={`model.${this.props.model}.${value}`} key={key}>
          {(msg) => (
            <Table.Cell key={key} style={style}>
              { msg }
            </Table.Cell>
          )}
        </FM>
      )
    }

    return (
      <Table.Cell key={key} style={style}>
        { value }
      </Table.Cell>
    )
  }

  TableRowNormal (index, rec, treeView) {
    return (
      <Table.Row key={index}>
        {
          this.cellButtonStart.map((value, index) =>
            this.actionButton(rec, value, index)
          )
        }
        {
          treeView.map((field, j) => this.getCell(rec, field, j))
        }
        {
          this.cellButtonEnd.map((value, index) =>
            this.actionButton(rec, value, index)
          )
        }
      </Table.Row>
    )
  }

  TableRowSubtitle (index, rec, treeView) {
    return (
      <Table.Row
        key={index}
        style={StyledRow(color.greenLight)}>
        {
          treeView.map((field, j) => {
            return this.getCell(rec, field, j, false, 'bold')
          })
        }
      </Table.Row>
    )
  }

  render () {
    const { treeView } = this.state
    const _records = Object.values(this.props.records)

    return (
      <Table.Body style={styles.bodyTable}>
        {
          _records && _records.map((rec, i) => {
            return rec['kind'] === 'category'?
              this.TableRowSubtitle(i, rec, treeView)
              : this.TableRowNormal(i, rec, treeView)
          })
        }
      </Table.Body>
    )
  }
}

function StyledRow(color) {
  let row = {
    height: 24,
    padding: 2,
  }
  if (color) {
    row['background'] = color
  }
  return row
}

function stylesCtx (width, align, fontWeight, padding) {
  return {
    width: width,
    textAlign: align,
    fontWeight: fontWeight
  }
}

const styles = {
  headerButton: {
    padding: 0,
    textAlign: 'center',
    maxWidth: '10%'
  }
}

export default BodyTable
