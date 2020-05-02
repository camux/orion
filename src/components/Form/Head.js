
import React from 'react'
import { Header } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

import { color } from 'theme'

function Head (props) {
  return (
    <Header as={props.type} style={styles.header}>
      <FM id={props.text} />
    </Header>
  )
}


const styles = {
  header: {
    color: color.greenDark,
    width: '100%'
  }
}

export default Head
