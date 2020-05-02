
import React, { Component } from 'react'
import { FormattedMessage as FM } from 'react-intl'
import { Grid, Table } from 'semantic-ui-react'

import CalendarSelect from './CalendarSelect'
import BodyTable from 'components/Table/BodyTable'
import TableHeader from 'components/Table/TableHeader'
import FilterTable from 'components/Table/FilterTable'
import PaginationTable from 'components/Table/PaginationTable'
import LoadingTable from 'components/Tools/LoadingTable'
import SearchMenu from './SearchMenu'
import sortRecords from 'tools/sortRecords'

const ROWS_PAGE = 30

const buttonRemove = {
  action: 'remove', tooltip: 'board.button_remove', icon: 'delete', color: '#f36664'
}

const buttonUpdate = {
  action: 'update', tooltip: 'board.button_edit', icon: 'edit', color: '#05a0b4'
}

const buttonAdd = {
  action: 'add', tooltip: 'board.butotn_add', icon: 'add', color: 'teal'
}


class QuickTable extends Component {
  constructor (props) {
    super(props)
    const { ctxView, filters } = props
    this.searchRecords = this.searchRecords.bind(this)
    this.sliceRecords = this.sliceRecords.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.onClickFilter = this.onClickFilter.bind(this)
    this.handleSort = this.handleSort.bind(this)

    let cellButtons = []
    let actionButtons = []

    if (ctxView.table_action_remove) {
        cellButtons.push(buttonRemove)
    }

    if (ctxView.table_action_update) {
        cellButtons.push(buttonUpdate)
    }

    if (ctxView.form_action_add) {
        actionButtons.push(buttonAdd)
    }

    let filterTags
    if (filters) {
      filterTags = []
      for (let [k, v] of Object.entries(filters)) {
        filterTags.push({
          key: k,
          text: <FM id={`model.${props.model}.${k}`} />,
          value: v,
          label: { color: 'pink', empty: true, circular: true },
        })
      }
    }

    let orderDirection
    if (ctxView['order']) {
      orderDirection = ctxView['order'] === 'asc'? 'ascending' : 'descending'
    }

    this.state = {
      records: [], //records,
      orderDirection: orderDirection,
      orderField: ctxView['order_by'],
      fields: ctxView['webtree'],
      calendar: ctxView['calendar'],
      sheet: ctxView['sheet'],
      cellButtons: cellButtons,
      actionButtons: actionButtons,
      activePage: 1,
      filterTags: filterTags,
      filterValue: 'board.quicktable.filter',
      loading: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
     if (nextProps.records !== prevState.records) {
       return {
        records: nextProps.records,
        loading: false
      }
    }
    return null
  }

  onPageChange = (event, data) => {
    this.setState({ activePage: data.activePage })
  }

  onClickFilter = async (event, data) => {
    this.props.handleFilter(data.value)
    this.setState({
      filterValue: `${data.text.props.id}`,
      loading: true
    })
  }

  onClickSeeCalendar = async (event, data) => {
    this.props.onChangeView(event, 'calendar', [])
  }

  onClickSeeSheet = async (event, data) => {
    this.props.onChangeView(event, 'sheet', [])
  }

  sliceRecords = (page, records) => {
    let _records = this.state.records
    if (records) {
      _records = records
    }
    if (_records) {
      page--
      if (typeof _records === 'object') {
        _records = Object.values(_records)
      }
      return _records.slice(page * ROWS_PAGE, page * ROWS_PAGE + ROWS_PAGE)
    }
  }

  handleSort = (clickedColumn) => () => {
    const { records, orderDirection } = this.state
    const _orderDirection = orderDirection === 'ascending'? 'descending' : 'ascending'
    const sortedRecs = sortRecords(records, clickedColumn, _orderDirection)

    this.setState({
      orderField: clickedColumn,
      records: sortedRecs,
      orderDirection: _orderDirection,
    })
  }

  async searchRecords (value) {
    this.props.searchRecords(value)
  }

  render () {
    let { records, activePage, cellButtons, sheet, calendar, fields, filterTags,
      filterValue, orderField, orderDirection, loading } = this.state
    const totalPages = Math.floor(records.length / ROWS_PAGE) + 1
    if (records instanceof Map) {
      let _records = []
      for (let r of records.values()) {
        _records.push(r)
      }
      records = _records
    }

    // const visibleRecords = this.sliceRecords(records)
    const visibleRecords = records
    // { this.props.activeSearch &&
    //   <SearchBar
    //   value={value}
    //   onChange={(newValue) => this.setState({ value: newValue })}
    //   onRequestSearch={() => this.searchRecords(this.state.value)}
    //   />
    // }

    let countRecords = ''
    if (records.length > 0) {
      countRecords = records.length
    }
    const pagVisible = records.length > ROWS_PAGE

    return (
      <Grid.Column id='board-table' width={16} style={styles.table}>
        <Grid.Row id='row-tools' style={styles.rowTools}>
          <FilterTable filterValue={filterValue} countRecords={countRecords}
              onClickFilter={this.onClickFilter} filterTags={filterTags} />
          { true ? null : <SearchMenu active={false} /> }
          <CalendarSelect active={calendar} onClick={this.onClickSeeCalendar} />
        </Grid.Row>
      <Table sortable={this.props.sortable} striped unstackable selectable color='olive'>
        <TableHeader buttons={cellButtons} fields={fields}
          model={this.props.model} orderDirection={orderDirection}
          orderField={orderField} handleSort={this.handleSort}
          sortable={this.props.sortable} />
          {
            !loading ?
            <BodyTable {...this.props} records={visibleRecords}
              cellButtons={cellButtons} />
            : null
          }
      </Table>
      { loading? <LoadingTable /> : null}
      <PaginationTable visible={pagVisible} activePage={activePage}
          totalPages={totalPages} onPageChange={this.onPageChange} />
      </Grid.Column>
    )
  }
}

const styles = {
  rowTools: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20
  },
  table: {
    width: '100%',
    display: 'table',
    paddingLeft: 0
  }
}

export default QuickTable
