
import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

function Loading () {

  return (
    <div style={styles.div}>
        <Dimmer active inverted style={styles.loader}>
          <Loader inverted>
            <p style={styles.loader}>
              <FM id={'board.loading_please_wait'} />
            </p>
          </Loader>
        </Dimmer>
    </div>
  )
}

const styles = {
  div: {
    marginTop: 100,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20
  }
}

export default Loading
