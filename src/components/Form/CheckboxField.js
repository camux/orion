
import React, { useState } from 'react'
import { Checkbox } from 'semantic-ui-react'

import ColForm from 'components/Grid/ColForm'

function CheckboxField (props) {
  const [checked, changeChecked] = useState(props.value || false)

  function handleCheck(event, data) {
    let child
    if (props.recId) {
      child = { id: props.recId }
    }
    props.onChange(props.name, data.checked, child)
    changeChecked(data.checked)
  }

  return (
    <ColForm {...props}>
      <Checkbox
        key={props.name}
        name={props.name}
        label={{ children: props.label }}
        onClick={handleCheck}
        readOnly={false}
        checked={checked}
      />
    </ColForm>
  )
}

export default CheckboxField
