
import React from 'react'
import { Form } from 'semantic-ui-react'

import ColForm from 'components/Grid/ColForm'
import styles from './stylesField'

function FormField (props) {
  return (
    <ColForm {...props}>
      <Form.Field style={styles.field}>
        <label style={styles.label}>{props.label}
          <p style={styles.required}>&nbsp; {props.required && '*'}</p>
        </label>
        { props.children }
      </Form.Field>
    </ColForm>
  )
}

export default FormField
