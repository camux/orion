
import React from 'react'
import { Table } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'


function TableHeader (props) {

  function headerCellOrdered (index, field) {
    return (
      <Table.HeaderCell
        key={index}
        style={stylesCtx(field.width)}
        sorted={props.orderField === field.name ? props.orderDirection : null}
        onClick={props.handleSort(field.name)}
        >
      { <FM id={`model.${props.model}.${field.name}`} /> }
      </Table.HeaderCell>
    )
  }

  function headerCell (index, field) {
    return (
      <Table.HeaderCell
        key={index}
        style={stylesCtx(field.width)}
        >
      { <FM id={`model.${props.model}.${field.name}`} /> }
      </Table.HeaderCell>
    )
  }


  return (
    <Table.Header>
      <Table.Row key={'header'}>
        {
          props.buttons.map((button) => {
            return (
              <Table.HeaderCell key={button.action} style={styles.headerButton}>
                <FM id={button.tooltip} />
              </Table.HeaderCell>
            )
          })
        }
        {
          props.sortable ?
            props.fields.map((field, index) => headerCellOrdered(index, field))
          :
            props.fields.map((field, index) => headerCell(index, field))
        }
      </Table.Row>
    </Table.Header>
  )
}


function stylesCtx (width) {
  return {
    width: width,
    textAlign: 'center',
  }
}

const styles = {
  headerButton: {
    textAlign: 'center',
    maxWidth: '10%'
  },
  table: {
    width: '100%',
    display: 'table',
    paddingLeft: 0
  }
}

export default TableHeader
