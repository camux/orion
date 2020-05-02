
import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'

import FormField from './FormField'
import client from 'client'

function InputField (props) {
  let _value = ''
  if (props.value) {
    _value = props.value.name
  }
  const [value, setValue] = useState(_value)
  const [loading, setLoading] = useState(false)
  const [placeholder, setPlaceholder] = useState(null)
  const [error, setError] = useState(props.error)
  const [valid, setValid] = useState(false)

  async function fetchToAPI(clause) {
    const record = await client.proxy.search_record(props.submodel, clause)
    console.log('XXXX >>', record)
    if (record ) {
      if (record.active && record.active == false) {
        setError(true)
        setLoading(false)
        setValid(false)
        setValue('')
        // <FM id={'board.form.record_not_found'} />
        setPlaceholder('Record not active...!')
      } else {
        const _item = {
          id: record.id,
          name: record.name
        }
        setLoading(false)
        setValue(record.name)
        setValid(true)
        props.onChange(props.name, _item)
      }
    } else {
      setError(true)
      setLoading(false)
      setValid(false)
      setValue('')
      // <FM id={'board.form.record_not_found'} />
      setPlaceholder('Not found...!')
    }
  }

  function searchClicked(event) {
    if (valid) return
    setError(false)
    setPlaceholder(null)
    if (value) {
      setLoading(true)
      fetchToAPI(value)
    }
  }

  function selectedItem(event, data) {
    setValid(false)
    setValue(data.value)
  }

  return (
    <FormField {...props}>
      <Input
        fluid
        value={value}
        loading={loading}
        placeholder={placeholder}
        disabled={props.readonly}
        icon={{ name: 'search', circular: true, link: true, onClick: searchClicked, inverted: true }}
        name={props.name}
        key={props.name}
        error={error}
        onChange={selectedItem}
        onBlur={searchClicked}
      />
    </FormField>
  )
}

export default InputField
