
import React from 'react'
import { Image } from 'semantic-ui-react'

import FormField from './FormField'

function ImageField (props) {

  let size = 'small'
  if (props.size) {
    size = props.size
  }

  return (
    <FormField {...props}>
      <Image
        style={stylesCtx(size)}
        id={props.name}
        name={props.name}
        key={props.name}
        disabled={props.readonly}
        src={props.value}
      />
    </FormField>
  )
}

const stylesCtx = (size) => {
  let maxWidth, maxHeight
  if (size === 'small') {
    maxWidth = 100
    maxHeight = 100
  } else if (size === 'middle') {
    maxWidth = 200
    maxHeight = 200
  } else {
    maxWidth = 300
    maxHeight = 300
  }
  return {
    maxWidth,
    maxHeight,
    margin: 'auto'
  }
}

export default ImageField
