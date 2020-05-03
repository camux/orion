
import React, { Component } from 'react'
import { Grid, Dropdown, Button } from 'semantic-ui-react'
import ReactDataSheet from 'react-datasheet'
import { FormattedMessage as FM } from 'react-intl'
import moment from 'moment'
import store from 'store'

import { color } from 'theme'
import proxy from 'proxy'
import 'react-datasheet/lib/react-datasheet.css'
import 'components/Sheet/data_sheet.css'

class QuickSheet extends Component {
  constructor (props) {
    super(props)
    this.onDataChange = this.onDataChange.bind(this)
    this.getOptions = this.getOptions.bind(this)
    this.sheetRenderer = this.sheetRenderer.bind(this)
    this.setDataSheet = this.setDataSheet.bind(this)
    this.cellRenderer = this.cellRenderer.bind(this)
    this.toSave = this.toSave.bind(this)

    this.sheetStore = new Map()

    this.state = {
      model: props.ctxView['name'],
      headers: [],
      data: [],
      selectedOption: null,
      options: [],
      messageCtx: null,
      validValues: {}
    }
  }

  async setDataSheet (selectedOption) {
    const { model } = this.state
    const args = {
      period: selectedOption
    }
    const [headers, data, validValues] = await proxy.get_sheet(model, args)
    this.setState({ headers, data, selectedOption, validValues })
  }

  async getOptions () {
    const today = moment().format('YYYY-MM-DD')
    const session = store.get('ctxSession')
    const dom = `[
        ('fiscalyear.start_date', '<=', '${today}'),
        ('fiscalyear.end_date', '>=', '${today}'),
        ('type', '=', 'standard'),
        ('fiscalyear.company', '=', ${session.company}),
    ]`
    const _periods = await proxy.search('account.period', dom)
    let periods = []
    for (const p of _periods) {
      periods.push({ key: p['id'], value: p['id'], text: p['name'] })
    }
    this.setState({
      selectedOption: periods[0]['id'],
      options: periods
    })
  }

  componentDidMount () {
    this.getOptions()
  }

  toSave = async () => {
    if (this.sheetStore.size === 0) {
      return
    }
    const data = {
      model: 'surveillance.schedule.shift',
      values: Array.from(this.sheetStore.values()),
    }
    const res = await proxy.saveMany(data)
    this.sheetStore.clear()
    const messageCtx = {
      type: 'msgInfo',
      msg: 'board.records_saved'
    }
    this.setState({ messageCtx })
  }

  onChangeSelector = (event, data) => {
    this.setDataSheet(data.value)
  }

  onDataChange = (changes) => {
    const { data, validValues } = this.state
    const grid = data.map(row => [...row])
    for (let ch of changes) {
      const val_id = validValues[ch.value]
      if (val_id) {
        this.sheetStore.set(ch.cell.id, {id: ch.cell.id, kind: val_id})
      } else {
        return
      }
    }
    changes.forEach(({cell, row, col, value}) => {
      grid[row][col] = {...grid[row][col], value}
    })

    this.setState({
      data: grid,
      messageCtx: null
    })
  }

  sheetRenderer = (props) => {
    const { headers } = this.state
    return (
      <table className='data-grid' >
        <thead>
          <tr style={styles.headRow}>
            { headers.map(col => (
              <th key={col.label} style={headStyle(col)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { props.children }
        </tbody>
      </table>
    )
  }

  cellRenderer = (props) => {
    const { headers } = this.state
    const { attributesRenderer, cell, row, col, editing, updated, style, ...rest } = props
    const styleCustom = {
      width: headers[col].width,
      textAlign: headers[col].align,
      paddingLeft: headers[col].paddingLeft || 0,
      backgroundColor: headers[col].color
    }
    let style_ = {...style, ...styleCustom}

    return (
      <td {...rest} style={style_}>
        { props.children }
      </td>
    )
  }

  render () {
    const { messageCtx } = this.state
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column style={styles.tools} width={8}>
            <Dropdown
              placeholder='Periodo'
              selection
              labeled
              onChange={this.onChangeSelector}
              options={this.state.options}
            />
          </Grid.Column>
          <Grid.Column style={styles.tools} width={8}>
            <Button basic color='blue'
              style={styles.button} onClick={this.toSave}>
              <FM id='board.button_save' />
            </Button>
          </Grid.Column>
        </Grid.Row>
        { messageCtx &&
          <Grid.Row>
            <Grid.Column width={16} style={getStyleMessage(messageCtx.type)}>
              <p style={styles.msgText}>{<FM id={messageCtx.msg} />}</p>
            </Grid.Column>
          </Grid.Row>
        }
        <Grid.Row style={styles.main_row}>
          <Grid.Column style={styles.col} width={16}>
            <ReactDataSheet
              cellRenderer={this.cellRenderer}
              sheetRenderer={this.sheetRenderer}
              data={this.state.data}
              valueRenderer={(cell) => cell.value}
              onCellsChanged={changes => this.onDataChange(changes)}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}


const msgColors = {
  'msgInfo': color.yellow,
  'msgWarning': color.salmon
}

function getStyleMessage (type) {
  return {
    backgroundColor: msgColors[type],
    height: 60,
    marginLeft: 0,
    marginRight: 0,
    display: 'flex',
    lineHeight: 60,
    alignItems: 'center'
  }
}

const headStyle = (ctx) => {
  return {
    textAlign: 'center',
    backgroundColor: 'rgb(203, 229, 246)',
    width: ctx.width,
    color: 'rgb(21, 49, 60)',
    border: '1px solid rgb(164, 164, 164)'
  }
}

const styles = {
  table: {
    width: '100%'
  },
  main_row: {
    marginBottom: 20,
  },
  headRow: {
    height: 40,
  },
  col: {
    display: 'table',
    paddingLeft: 0,
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'white'
  },
  tools: {
    display: 'table',
    paddingRight: 10,
  },
  msgText: {
    color: 'white',
    fontSize: '16px',
    paddingLeft: '20px'
  },
}

export default QuickSheet
