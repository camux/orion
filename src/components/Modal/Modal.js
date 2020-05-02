
import React from 'react'
import { Image, Button, Modal } from 'semantic-ui-react'
import { FormattedMessage as FM } from 'react-intl'
import successImg from 'assets/img/success.png'

function MeModal (props) {

  const buttons = {
    cancel: (
      <Button
        key='close'
        color='red'
        style={styles.button}
        onClick={props.onClose} >
        <FM id='board.dialog.button_cancel' />
      </Button>
    ),
    ok: (
      <Button
        key='ok'
        color='blue'
        style={styles.button}
        onClick={props.onAccept} >
        <FM id='board.dialog.button_ok' />
      </Button>
    ),
    close: (
      <Button
        basic
        key='close'
        color='blue'
        style={styles.button}
        onClick={props.onClose} >
        <FM id='board.dialog.button_close' />
      </Button>
    )
  }

  // <FM id='form_page.modal_title' />
  const dialogButtons = props.buttons.map((name) => {
    return buttons[name]
  })

  return (
    <Modal open={props.open}>
      <Modal.Header id='simple-dialog-title'>
        {
          props.titleModal?
            <div style={styles.div_text}>
              <p style={styles.text}> <FM id={props.titleModal} /> </p>
            </div>
          : null
        }

      </Modal.Header>
      <Modal.Content style={styles.content}>
        <Image wrapped size='small' src={successImg} style={styles.img}/>
        <Modal.Description>
          <FM id={props.msgModal} />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions style={styles.actions}>
        { dialogButtons }
      </Modal.Actions>
    </Modal>
  )
}

const styles = {
  div_text: {
    padding: 20
  },
  content: {
    textAlign: 'center',
  },
  img: {
    width: 70,
    margin: 'auto',
    paddingBottom: 30
  },
  text: {
    textAlign: 'center',
    color: 'rgb(96, 102, 102)'
  },
  actions: {
    display: 'flex'
  },
  button: {
    padding: 10,
    margin: 25,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

export default MeModal
