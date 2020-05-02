
import React from 'react'
import { Grid } from 'semantic-ui-react'

import { Container } from 'components/Board/BoardContext'

function GridBoard (props) {
  return (
    <Grid.Row id={`board-${props.model}`} style={props.styled.mainBoard}>
      <Grid.Column width={16} style={styles.mainCol}>
        <Container id='board-container'>
          { props.children }
        </Container>
      </Grid.Column>
    </Grid.Row>
  )
}

const styles = {
  mainCol: {
    height: '100%',
    padding: 0
  }
}

export default GridBoard
