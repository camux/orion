
import React, { useState, useEffect } from 'react'
import { Input } from 'semantic-ui-react'

import FormField from './FormField'
import tools from 'tools/common'


function TextField (props) {
  let [editedValue, setValue] = useState(props.value || '')
  let type = props.type || 'text'
  if (type === 'number') {
    type = 'text'
  }

  useEffect(() => {
   setValue(props.value || '')
 }, [props.value])

  if (props.type === 'number' && props.value) {
    editedValue = props.value.toLocaleString('es', {useGrouping:true})
  }

  function handleText(event, data) {
    if (props.type === 'number' || props.type === 'integer') {
      if (data.value !== '' && !tools.isNumber(data.value)) {
        return
      }
    }
    setValue(data.value)
    props.onChange(props.name, data.value, props.triggerAction)
  }

  let label = null
  let labelPosition = null
  if (props.helper) {
    label = { basic: true, content: props.helper }
    labelPosition = 'right'
  }

  if (props.prefix) {
    label = { basic: true, content: props.prefix }
    labelPosition = 'left'
  }

  return (
    <FormField {...props}>
      <Input
        fluid
        disabled={props.readonly}
        label={label}
        labelPosition={labelPosition}
        error={props.error}
        id={props.name}
        key={props.name}
        name={props.name}
        value={editedValue}
        type={type}
        onChange={handleText}
      />
    </FormField>
  )
}

export default TextField
