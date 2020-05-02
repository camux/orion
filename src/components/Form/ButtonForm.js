
import React from 'react'
import { Grid, Button } from 'semantic-ui-react'

function ButtonForm (props) {
  return (
    <Grid.Column mobile={16} table={8} computer={8} style={styles.col} >
      <Button
        color='olive'
        disabled={props.readonly}
        key={props.value}
        style={styles.button}
        onClick={() => props.onClick(props.value, props.msg_ok, props.redirect)}
        content={props.label}
        />
    </Grid.Column>
  )
}

const styles = {
  col: {
    display: 'flex',
    padding: 10
  },
  button: {
    width: '100%',
    marginTop: 10
  },
}

export default ButtonForm
