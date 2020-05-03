
import React, { useState } from 'react'
import { Input, Menu, Modal, Grid, Label } from 'semantic-ui-react'
// import { DateInput } from 'semantic-ui-calendar-react'
import { FormattedMessage as FM } from 'react-intl'

import FormField from './FormField'
import tools from 'tools/common'
import proxy from 'proxy'


function DateTimeSelectorField (props) {
  let [selectedDate, setSelectedDate] = useState(props.value || '')
  let [selectedTime, setSelectedTime] = useState('')
  let [hours, setHours] = useState([])
  let [open, setModalOpen] = useState(false)

  async function getDefaultHours() {
    if (props.record && props.depends && props.model) {
      let args = {}
      for (let d of props.depends) {
        let value = props.record[d]
        if (d === props.name) {
          // Select only date part and ignore time part if exists
          if (value) {
            value = value.slice(0, 10)
          } else {
            value = tools.fmtDate2Tryton(selectedDate)
          }
        }
        args[d] = value
      }
      args = JSON.stringify(args)
      const res = await proxy.get_method(props.model, props.data_source, args)
      setHours(res)
    }
  }

  function handleDateChange(event, data) {
    setSelectedDate(data.value)
    const fmtValue = tools.fmtDate2Tryton(data.value)
    props.onChange(props.name, fmtValue)
    setSelectedTime('')
  }

  function handleTimeClick (e, data) {
    setSelectedTime(data.name)
    setModalOpen(false)
    const fmtDateTime = tools.fmtDateAndTime2Tryton(selectedDate, data.name)
    props.onChange(props.name, fmtDateTime)
  }

  function getItem (e, i) {
    let method
    if (e.status === 'available') {
      method = handleTimeClick
    }
    return (
      <Menu.Item key={e.id} name={e.hour} onClick={method}
        style={getStyle(e)}>
        { e.hour }
        <Label style={getStyleLabel(e)}><FM id={ e.status } /></Label>
      </Menu.Item>
    )
  }

  function handleModal () {
    getDefaultHours()
    setModalOpen(true)
  }

  function onClose () {
    setModalOpen(false)
  }

  return (
    <FormField {...props}>
      <Grid style={{display: 'flex'}}>
        <Grid.Row>
          <Grid.Column width={8}>
            {/* <DateInput
              id={props.name}
              name={props.name}
              key={props.name}
              disabled={props.readonly}
              value={selectedDate}
              onChange={handleDateChange}
              iconPosition="left"
              style={{ width: '100%', marginRight: 5 }}
            />
            */}
          </Grid.Column>
          <Grid.Column width={8}>
            <FM id='select_time'>
              { placeholder =>
                <Input
                placeholder={placeholder}
                value={selectedTime}
                style={{ width: '100%' }}
                onClick={handleModal}
              />
              }
            </FM>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal open={open} closeIcon onClose={onClose}>
        <Modal.Header>Select a hour...</Modal.Header>
        <Menu vertical style={{width: '100%'}}>
          { hours.length > 1?
            hours.map((e, i) => getItem(e, i))
            : <p style={styles.msgMissing}><FM id='no_records_found_missing_fields'/></p>
          }
        </Menu>
      </Modal>
    </FormField>
  )
}


function getStyle(e) {
  let backgroundColor = 'rgba(190, 190, 190, 0.5)'
  if (e.status === 'available') {
    backgroundColor = 'white'
  }
  return {
    justifyContent: 'center',
    display: 'flex',
    minMeight: 20,
    backgroundColor: backgroundColor
  }
}

function getStyleLabel(e) {
  let backgroundColor = 'transparent'
  let color = 'rgb(71, 71, 71)'
  if (e.status === 'available') {
    backgroundColor = 'rgb(121, 191, 31)'
    color = 'white'
  }
  return {
    justifyContent: 'center',
    display: 'flex',
    minMeight: 20,
    backgroundColor: backgroundColor,
    color: color
  }
}

const styles = {
  msgMissing: {
    backgroundColor: 'rgb(166, 55, 149)'
  }
}

export default DateTimeSelectorField
