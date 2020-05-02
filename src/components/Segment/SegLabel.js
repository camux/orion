
import React from 'react'
import { Icon, Button, Segment, Header } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

function SegLabel (props) {

  function onClick(event, data) {
    props.onClick()
  }

  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='chart bar' color='yellow' />
        {props.name}
      </Header>
      <Segment.Inline>
        <Button basic color='teal' onClick={onClick}>
          <FM id={'board.chart.see_report'} />
        </Button>
      </Segment.Inline>
    </Segment>
  )
}


export default SegLabel
