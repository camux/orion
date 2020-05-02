
import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

function LoadingTable () {

  return (
    <Segment style={styles.segment}>
      <Dimmer active inverted>
        <Loader inverted>
          <FM id={'board.loading'} />
        </Loader>
      </Dimmer>
    </Segment>
  )
}

const styles = {
  segment: {
    marginBottom: 20,
    minHeight: 200,
    textAlign: 'center'
  }
}

export default LoadingTable
