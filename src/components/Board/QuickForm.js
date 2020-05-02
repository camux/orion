
import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import FactoryForm from 'components/Form/FactoryForm'
import Head from 'components/Form/Head'
import Paragraph from 'components/Form/Paragraph'
import { color } from 'theme'
import store from 'store'

class QuickForm extends Component {
  constructor (props) {
    super(props)
    let { ctxView } = props
    this.setForm = this.setForm.bind(this)

    this.fields = ctxView['webfields']
    if (ctxView['webform']) {
      this.formView = ctxView['webform']
    } else if (ctxView['webuserform']) {
      this.formView = ctxView['webuserform']
      store.remove('ctxSession')
    }

    this.factory = new FactoryForm(this.props)
  }

  setForm () {
    let formActive = []
    for (let field of this.formView) {
      let component
      const valueFm = `model.${this.props.model}.${field.name}`
      if (['h2', 'h3', 'h4'].includes(field.component)) {
        component = <Head key={field.name} text={valueFm} type={field.component}/>
      } else if (field.component === 'text') {
        component = <Paragraph key={field.name} text={valueFm}/>
      } else if (field.component === 'img') {
        component = <img key='form-img' alt='logo-company' src={field.img_link} style={{margin: 'auto'}}  />
      } else {
        const fieldObj = this.fields[field.name]
        if (fieldObj) {
          component = this.factory.getField(
            fieldObj, field.name, this.props.activeRecord, field.component
          )
        }
      }

      formActive.push(component)
    }
    return formActive
  }

  render () {
    return (
      <Grid style={styles.form} id='col-quick-form'>
        { this.setForm() }
      </Grid>
    )
  }
}

const styles = {
  form: {
    flexWrap: 'wrap',
    alignItems: 'left',
    display: 'flex',
    height: '100%',
    backgroundColor: color.grayWhite,
    marginTop: 15,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 20,
  }
}

export default QuickForm
