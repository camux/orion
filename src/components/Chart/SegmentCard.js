
import React from 'react'
import { Grid, Card } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'

function SegmentCard({ ...props }) {

  const in_thousands = <FM id={'board.chart.in_thousands'} />

  return (
    <Grid.Column mobile={16} tablet={8} computer={5}>
      <Card style={styles.card}>
        { props.children }
        <Card.Content style={styles.content}>
          <Card.Header style={styles.header}>{ props.header }</Card.Header>
        </Card.Content>
        <Card.Description style={styles.description}>
          { props.description }
        </Card.Description>
        <Card.Meta style={styles.meta}>
          { props.meta &&
            <span className='date'> { props.meta }</span>
          }
          { props.in_thousands &&
            <span className='date'> { in_thousands }</span>
          }
        </Card.Meta>
      </Card>
    </Grid.Column>
  )
}

const styles = {
  card: {
    width: '98%',
    padding: 18,
    marginBottom: 18,
    marginLeft: 5,
    marginRight: 5
  },
  header: {
    color: '#7a7a7a'
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  meta: {
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  description: {
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    color: 'gray'
  }
}

export default SegmentCard
