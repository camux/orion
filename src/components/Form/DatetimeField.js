
import React, { useState } from 'react'
// import { DateTimeInput } from 'semantic-ui-calendar-react'

import FormField from './FormField'
import tools from 'tools/common'

function DatetimeField (props) {
  const value = tools.fmtDatetimeForm(props.value)
  const [selectedDate, setSelectedDate] = useState(value || '')

  function handleDateChange(event, data) {
    setSelectedDate(data.value)
    const value = tools.fmtDatetime2Tryton(data.value)
    props.onChange(props.name, value)
  }

  // <DateTimeInput
  // id={props.name}
  // name={props.name}
  // key={props.name}
  // value={selectedDate}
  // onChange={handleDateChange}
  // iconPosition="left"
  // style={{ width: '100%' }}
  // hideMobileKeyboard={true}
  // />
  return (
    <FormField {...props}>
    </FormField>
  )
}

export default DatetimeField
