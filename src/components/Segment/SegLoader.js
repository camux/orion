
import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'


function SegLoader (props) {

  return (
    <Segment placeholder>
      <Dimmer active>
        <Loader />
      </Dimmer>
    </Segment>
  )
}


export default SegLoader
