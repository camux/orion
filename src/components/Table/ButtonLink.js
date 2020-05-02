
import React from 'react'
import { Table, Icon } from 'semantic-ui-react'


function ButtonLink (props) {
  let ctxlink = props.value
  if (props.data_source) {
    ctxlink = props.data_source.replace('$value', props.value)
  }

  return (
    <Table.Cell>
      <p style={{paddingRight: 5}}> { props.value } </p>
      <a href={ctxlink} target='_blank' rel='noopener noreferrer'>
        <Icon name='chat' size='large' color='green'/>
      </a>
    </Table.Cell>
  )
}

export default ButtonLink
