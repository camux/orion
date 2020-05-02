
import React from 'react'
import { Input } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'
import { color } from 'theme'

import FormField from './FormField'

function TextMultiField (props) {
  const ctx = {readonly: props.readonly}
  return (
    <FormField {...props}>
      <Input
        multiline
        disabled={props.readonly}
        id={props.name}
        key={props.name}
        name={props.name}
        rowsMax={props.rowsMax}
        label={<FM id={props.label} />}
        value={props.value || ''}
        style={stylesField(ctx)}
        onChange={props.onChange} />
    </FormField>
  )
}

const stylesField = ctx => ({
  width: '100%',
  textAlign: 'left',
  marginBottom: 20,
  backgroundColor: ctx.readonly ? color.grayWhite : 'white'
})

export default TextMultiField
