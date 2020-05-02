
import React, { Component } from 'react'
import { Button, Modal, Header } from 'semantic-ui-react'
import { FormattedHTMLMessage as FHM, FormattedMessage as FM } from 'react-intl'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { Slider } from 'react-semantic-ui-range'
import { color } from 'melhous-theme'

import FormField from './FormField'
import './zone_cloud_image.css'
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL} from 'env'
var request = require('superagent')


class ZoneCloudImage extends Component {
  constructor (props) {
    super(props)
    this.onZoomChange = this.onZoomChange.bind(this)
    this.onAcceptEdition = this.onAcceptEdition.bind(this)
    this.onCancelEdition = this.onCancelEdition.bind(this)
    this.onImageRemove = this.onImageRemove.bind(this)
    this.onImageDrop = this.onImageDrop.bind(this)
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.setEditorRef = this.setEditorRef.bind(this)
    console.log('SIZE > ', this.props.size)
    console.log('w H', props.width, props.height)
    this.state = {
      showModal: false,
      resized_image: '',
      toUploadFile: '',
      uploadedImgCloud: this.props.value,
      scale: 1,
      sliderValue: 50
    }

    this.dropStyle = {
      width: this.props.size[1],
      height: this.props.size[0]
    }

    this.sliderSettings = {
      start: 50,
      min: 0,
      max: 100,
      step: 1,
      onChange: value => {
        this.onZoomChange(value)
      }
    }
  }

  onAcceptEdition () {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas()
      const file_ = canvasScaled.toDataURL()
      this.onCloseImageEdit(file_)
    }
  }

  onCancelEdition () {
    this.onCloseImageEdit()
  }

  onZoomChange (newValue) {
    const scale = (newValue / 100)
    this.setState({
      scale: scale,
      sliderValue: newValue
    })
  }

  onImageRemove (event) {
    // Delete image url in database
    let { uploadedImgCloud } = this.state
    this.props.onChange(this.props.name, '')

    // Delete image in drop zone
    this.setState({
      uploadedImgCloud: ''
    })

  }

  onImageDrop (acceptedFiles, rejectedFiles) {
    if (acceptedFiles) {
      this.setState({
        toUploadFile: acceptedFiles[0],
        showModal: true
      })
    }
  }

  onCloseImageEdit (resizedFile) {
    this.setState({showModal: false})
    if (resizedFile) {
      this.handleImageUpload(resizedFile)
    }
  }

  handleImageUpload (file) {
    const upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      const resImgUrl = response.body.secure_url
      if (resImgUrl !== '') {
        this.setState({
          uploadedImgCloud: resImgUrl
        })
        this.props.onChange(this.props.name, resImgUrl)
      }
    })
  }

  setEditorRef (editor) {
    this.editor = editor
  }

  render () {
    const { scale, sliderValue, showModal, uploadedImgCloud, toUploadFile } = this.state

    var targetImg = {}
    if (uploadedImgCloud && uploadedImgCloud !== '') {
      Object.assign(this.dropStyle, styles.drop_zone_invisible)
      targetImg = () =>
        (
          <div height={this.props.height} width={this.props.width}>
            <img src={uploadedImgCloud} alt={this.props.field} />
          </div>
        )
    } else {
      Object.assign(this.dropStyle, styles.drop_zone)
      targetImg = () =>
        (
          <div height={this.props.height} width={this.props.width}>
            <div>
              <p style={styles.content}>
                <FM id='zone_cloud_image.add_photo' />
              </p>
            </div>
            <br />
            <div>
              <p style={styles.content}>
                <FHM id='zone_cloud_image.images_accepted' />
              </p>
            </div>
          </div>
        )
    }

    return (
      <FormField {...this.props}>
        <Dropzone
          style={this.dropStyle}
          multiple={false}
          accept='image/jpg,image/png,image/jpeg'
          onDrop={this.onImageDrop}
        >
          { targetImg }
        </Dropzone>
        <Button basic style={styles.button} onClick={this.onImageRemove} >
          <FM id='zone_cloud_image.buton_remove' />
        </Button>
        <Modal
          open={showModal}
          style={styles.dialog} >
          <Header as='h3' style={{marginBottom: 15}}><FM id='zone_cloud_image.edit_image' /></Header>
          <AvatarEditor
            image={toUploadFile}
            ref={this.setEditorRef}
            width={this.dropStyle.width}
            height={this.dropStyle.height}
            border={40}
            color={[255, 255, 255, 0.6]}
            scale={scale}
          />
          <Slider
            settings={this.sliderSettings}
            color={'red'}
            value={sliderValue}
          />
          <Button basic color='red' style={styles.button} onClick={this.onCancelEdition}>
            <FM id='zone_cloud_image.cancel' />
          </Button>
          <Button basic color='blue' style={styles.button} onClick={this.onAcceptEdition}>
            <FM id='zone_cloud_image.save' />
          </Button>
        </Modal>
      </FormField>
    )
  }
}

const styles = {
  dialog: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  divider: {
    marginBottom: 8,
    marginTop: 8
  },
  button: {
    margin: 20,
  },
  slider: {
    width: 270,
    margin: 'auto'
  },
  content: {
    textAlign: 'center',
    margin: 'auto'
  },
  drop_zone: {
    marginTop: 20,
    position: 'relative',
    display: 'grid',
    alignItems: 'center',
    backgroundColor: color.grayWhite,
    color: color.grayDark,
    borderStyle: 'dashed',
    borderWidth: 3,
    borderColor: color.grayDark,
    fontSize: 16
  },
  drop_zone_invisible: {
    marginTop: 20,
    position: 'relative',
    display: 'grid',
    alignItems: 'center',
    color: 'white',
    borderStyle: 'none',
    borderColor: 'white'
  }
}

export default ZoneCloudImage
