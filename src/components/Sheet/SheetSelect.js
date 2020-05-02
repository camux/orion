
import React from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

function SheetSelect (props) {
  if (!props.active) return null

  return (
    <Grid.Column style={styles.rowFilter} width={6}>
      <Button
        basic
        icon
        color='blue'
        labelPosition='left'
        onClick={props.onClick}
      >
        <Icon name='grid layout' />
        <FM id={`board.sheet_select`} />
      </Button>
    </Grid.Column>
  )
}

const styles = {
  rowFilter: {
    display: 'flex'
  }
}

export default SheetSelect
