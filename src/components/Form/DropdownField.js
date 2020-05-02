
import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'

import FormField from './FormField'

function DropdownField (props) {
  const [value, setValue] = useState(props.value || '')

  function selectedItem(event, data) {
    props.onChange(data.name, data.value)
    setValue(data.value)
  }

  return (
    <FormField {...props}>
      <Dropdown
        fluid
        search
        selection
        value={value}
        name={props.name}
        key={props.name}
        error={props.error}
        onChange={selectedItem}
        options={props.data_source || []}
      />
    </FormField>
  )
}

export default DropdownField
