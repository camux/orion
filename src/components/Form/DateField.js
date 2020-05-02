
import React, { useState } from 'react'
// import { DateInput } from 'semantic-ui-calendar-react'

import FormField from './FormField'
import tools from 'tools/common'

function DateField (props) {
  let _value = tools.fmtDate(props.value, true)
  let [selectedDate, setSelectedDate] = useState(_value || '')

  function handleDateChange(event, data) {
    setSelectedDate(data.value)
    const fmtValue = tools.fmtDate2Tryton(data.value)
    props.onChange(props.name, fmtValue)
  }

  // <DateInput
  // id={props.name}
  // name={props.name}
  // key={props.name}
  // disabled={props.readonly}
  // value={selectedDate}
  // onChange={handleDateChange}
  // iconPosition="left"
  // style={{ width: '100%' }}
  // />
  return (
    <FormField {...props}>
    </FormField>
  )
}

export default DateField
