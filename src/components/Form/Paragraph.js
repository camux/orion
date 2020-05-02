
import React from 'react'
import { FormattedMessage as FM } from 'react-intl'

function Paragraph (props) {
  return (
    <p key={props.text} style={styles.paragraph}>
      <FM id={props.text} />
    </p>
  )
}

const styles = {
  paragraph: {
    marginTop: 5,
    fontSize: 16,
    paddingLeft: 0,
    paddingRight: 0
  }
}

export default Paragraph
