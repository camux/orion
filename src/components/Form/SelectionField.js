
import React, { useState, useEffect } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { searchSelection } from 'helpers'
import FormField from './FormField'

function SelectionField (props) {
  const [itemsMapped, setItemsMap] = useState(new Map ())

  const [value, setValue] = useState(props.value)
  let _items = []
  if (value && value.id) {
    _items.push(
      { key: props.value.id, value: props.value.id, text: props.value.rec_name || props.value.name }
    )
  }
  const [items, setItems] = useState(_items)

  async function fetchToAPI(searchDom) {
    const items = await searchSelection(props.submodel, searchDom)
    setItems(items)
    for (let i of items) {
      itemsMapped.set(i.key, i.text)
    }
    setItemsMap(itemsMapped)
  }

  useEffect(() => {
    const _value = props.value ? props.value.id : ''
    setValue(_value)
  }, [props.value])

  function selectedItem(event, data) {
    const dataSet = {
      id: data.value,
      name: itemsMapped.get(data.value)
    }
    props.onChange(data.name, dataSet)
    setValue(data.value)
  }

  function onOpen(event, data) {
    fetchToAPI(props.searchDom)
  }

  let value_id = value
  if (value && value.id) {
    value_id = value.id
  }
  return (
    <FormField {...props}>
      <Dropdown
        fluid
        search
        selection
        disabled={props.readonly}
        value={value_id}
        name={props.name}
        key={props.name}
        error={props.error}
        onChange={selectedItem}
        onOpen={onOpen}
        options={items}
      />
    </FormField>
  )
}

export default SelectionField
