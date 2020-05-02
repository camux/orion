
import React from 'react'
import { Grid } from 'semantic-ui-react'

const FORMAT_DATE = 'DD/MMM'

function ItemPopoverTemplate (schedulerData, eventItem, title, start, end, statusColor) {
  return (
    <div style={{width: '300px'}}>
      <Grid.Row column={2} align="left" style={styles.title}>
        <Grid.Column>
          <div className="status-dot" style={{backgroundColor: statusColor}} />
        </Grid.Column>
        <Grid.Column className="overflow-text" style={styles.title_name}>
          <span className="header2-text" title={title}>{title}</span>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row column={2} align="left" style={styles.title}>
        <Grid.Column>
          <span className="header1-text">{start.format(FORMAT_DATE)} - {end.format(FORMAT_DATE)}</span>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row align="left" style={styles.title}>
        <Grid.Column>
          <p>{eventItem.room}</p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row align="left" style={styles.title}>
        <Grid.Column>
          <p>{eventItem.accommodation}</p>
        </Grid.Column>
      </Grid.Row>
    </div>
  )
}

const styles = {
  title: {
    display: 'flex',
  },
  title_name: {
    paddingLeft: 10
  }
}
export default ItemPopoverTemplate
