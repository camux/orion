
import React, { useState } from 'react'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import { Button, Image } from 'semantic-ui-react'

import FormField from './FormField'

import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from 'env'


function TakeCapture (props) {
  let [active, setActive] = useState(false)
  let [photo, setPhoto] = useState(props.value)

  function onActiveCamera () {
    setActive(true)
    setPhoto(null)
  }

  async function onTakePhoto (dataUri) {
    setActive(false)
    var formData = new FormData()
    formData.append('file', dataUri)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    const config = {
      method: 'POST',
      body: formData
    }

    const response = await fetch(CLOUDINARY_UPLOAD_URL, config)
    const res = await response.json()
    setPhoto(res.secure_url)
    props.onChange(props.name, res.secure_url)
  }

  return (
    <FormField {...props}>
      <Button onClick={onActiveCamera}>Take a photo</Button>
      { active?
        <Camera
          sizeFactor={0.5}
          style={styles.photo}
          onTakePhoto={ (dataUri) => { onTakePhoto(dataUri)} }
          isImageMirror={false}
        />
        :<Image
            key={props.name}
            src={photo}
            style={styles.photo}
          />
      }
    </FormField>
  )
}
const styles = {
  photo: {
    marginTop: 10
  },
}

export default TakeCapture
