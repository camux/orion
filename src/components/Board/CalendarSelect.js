
import React from 'react'
// import { FormattedMessage as FM } from 'react-intl'
import { Grid, Dropdown } from 'semantic-ui-react'

function CalendarSelect (props) {
  if (!props.active) return null

  return (
    <Grid.Column style={styles.rowFilter} width={6}>
      <Dropdown
        text='Calendar'
        icon='calendar alternate'
        floating
        labeled
        button
        className='icon'
      >
        <Dropdown.Menu>
          <Dropdown.Item key='week' text={'Week'} onClick={props.onClick} />
        </Dropdown.Menu>
      </Dropdown>
    </Grid.Column>
  )
}

const styles = {
  rowFilter: {
    display: 'flex'
  }
}

export default CalendarSelect
