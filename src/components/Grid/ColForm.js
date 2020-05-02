
import React from 'react'
import { Grid } from 'semantic-ui-react'

function ColForm (props) {

  return (
    <Grid.Column mobile={16} tablet={8} computer={8} style={styles.field}>
      { props.children }
    </Grid.Column>
  )
}

const styles = {
  field: {
    // display: 'grid',
    padding: '10px 10px 10px 0'
  }
}

export default ColForm
