
import React from 'react'
import { FormattedMessage as FM } from 'react-intl'
import { Grid } from 'semantic-ui-react'

import Modal from 'components/Modal/Modal'
import { color } from 'theme'

function FormPage (props) {
  return (
    <Grid.Row columns={1} id='form-page' style={styles.row_main}>
      <Grid.Column id="form-title" width={16} style={styles.col_title}>
        <h4 style={styles.title}><FM id={props.title} /></h4>
      </Grid.Column>
      { props.children }
      <Grid.Column width={16} style={styles.col_footer}>
        { props.formMessage &&
          <p style={styles.message}><FM id={props.formMessage} /></p>
        }
      </Grid.Column>
      {props.openModal && <Modal {...props} /> }
    </Grid.Row>
  )
}

const styles = {
  row_main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    // textAlign: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: color.grayLight,
    paddingBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  col_title: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    color: color.grayDark
  },
  message: {
    lineHeight: '24px',
    color: color.salmon
  },
  col_footer: {
    // margin: 20
  },
  div_children: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 30
  },
  title: {
    color: 'rgb(136, 136, 136)',
    marginTop: 'auto',
    marginBottom: 'auto'
  }
}

export default FormPage
