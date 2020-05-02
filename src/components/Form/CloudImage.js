
import React, { useState } from 'react'
import { Button, Image, Icon } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'
import { useDropzone } from 'react-dropzone'

import { color } from 'theme'
import FormField from './FormField'

import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from 'env'

const sizeStyle = {
  width: 200,
  height: 200
}

function CloudImage (props) {
  let [active, setActive] = useState(true)
  let [photo, setPhoto] = useState(null)

  if (props.value) {
    active = false
    photo = props.value
  }

  function onRemove () {
    const value = null
    props.onChange(props.name, value)
    setActive(true)
  }

  async function onImageDrop (acceptedFiles) {
    var formData = new FormData()
    if (acceptedFiles.lenght === 0) {
      return
    }
    const file_ = acceptedFiles[0]
    formData.append('file', file_)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    const config = {
      method: 'POST',
      body: formData
    }

    const response = await fetch(CLOUDINARY_UPLOAD_URL, config)
    const res = await response.json()
    setActive(false)
    setPhoto(res.secure_url)
    props.onChange(props.name, res.secure_url)
  }


  const {getRootProps, getInputProps } = useDropzone({
      onDrop: onImageDrop,
      accept: 'image/jpg,image/png,image/jpeg',
      multiple: false,
  })

  return (
    <FormField {...props}>
      { active?
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div height={sizeStyle.height} width={sizeStyle.width} style={styles.content}>
            <FM id='form_cloud_image.add_photo' />
          </div>
        </div>
        :<div>
          <Image
            key={props.name}
            src={photo}
            style={styles.photo}
          />
          <Button color='red' onClick={onRemove} style={styles.button}>
            <Icon name='cancel'/>
            Remove
          </Button>
        </div>
      }
    </FormField>
  )
}

const styles = {
  photo: {
    marginTop: 10
  },
  button: {
    marginTop: 5
  },
  content: {
    textAlign: 'center',
    margin: 'auto',
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
    display: 'grid',
    alignItems: 'center',
    backgroundColor: color.grayWhite,
    color: color.grayDark,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: color.aqua,
    fontSize: 16
  }
}

export default CloudImage
