
import React from 'react'
import { FormattedMessage as FM } from 'react-intl'

import SubBoard from 'components/Board/SubBoard'
import ButtonForm from './ButtonForm'
import TextMultiField from './TextMultiField'
import CheckboxField from './CheckboxField'
import DateField from './DateField'
import TextField from './TextField'
import ImageField from './ImageField'
import DatetimeField from './DatetimeField'
import DateTimeSelectorField from './DateTimeSelectorField'
import SelectionField from './SelectionField'
import InputField from './InputField'
import DropdownField from './DropdownField'
import TakeCapture from './TakeCapture'
import CloudImage from './CloudImage'

class FactoryForm {
  constructor (props) {
    this.props = props
  }

  getField (field, name, record, type) {
    let value
    const { model, updateStore, context } = this.props
    let label = `model.${model}.${name}`
    if (record && record[name] !== undefined) {
      value = record[name]
    } else if (Boolean(field.default)) {
      value = field.default
    }

    let error = Boolean(null && Boolean(!value))

    let readonly = false
    if (record && field.readonly) {
      if (Array.isArray(field.readonly)) {
        if (field.readonly.includes(record.state)) {
          readonly = true
        }
      } else if (typeof (field.readonly) === 'boolean') {
        readonly = field.readonly
      }
    }

    field['error'] = error
    field['value'] = value
    field['key'] = name
    field['name'] = name
    field['readonly'] = readonly
    field['label'] = <FM id={label} />
    field['onChange'] = updateStore

    if (record && field.visible && record.state) {
      let visible = field.visible.split(',')
      if (!visible.includes(record.state)) {
        return
      }
    }

    const field_type = field.type
    if (['char', 'number', 'integer', 'email', 'money'].includes(field_type)) {
      if (value && field.translate) {
        return (
          <FM id={`model.${model}.${value}`} key={field.key}>
          { (msg) => (
            <TextField {...field} msgIntl={msg} />
          )}
          </FM>
        )
      } else {
        return <TextField {...field} value={value} />
      }
    }

    switch (field_type) {
      case 'date':
        return <DateField {...field} />
      case 'datetime-selector':
        return <DateTimeSelectorField {...field} />
      case 'datetime':
        return <DatetimeField {...field} />
      case 'text-multiline':
        return <TextMultiField {...field} />
      case 'boolean':
        return <CheckboxField {...field} />
      case 'one2many':
        return <SubBoard key={name} records={value || new Map()}
          domain={field.domain} ctxView={field.ctx_view} model={field.model}
          parentId={record.id} updateStore={updateStore} fieldName={name}
          parentRecord={record} />
      case 'many2one':
        field['submodel'] = field.model
        if (type === 'input') {
          return <InputField {...field} />
        } else {
          let _domain = field.domain
          if (context && _domain && _domain.indexOf('ctx.user')) {
            const user = context['user']
            _domain = _domain.replace('ctx.user', user)
          }

          if (_domain && field.depends) {
            const depends = field.depends[0]
            let target = record && record[depends]
            if (depends && target && target.id) {
              _domain = _domain.replace('1', target.id)
            } else {
              _domain = false
            }
          }
          return <SelectionField {...field} searchDom={_domain}/>
        }
      case 'capture':
        return <TakeCapture {...field} />
      case 'selection':
        field['onClear'] = this.props.handleClearSelect
        return <DropdownField {...field} />
      case 'zone-image':
        return <CloudImage {...field} />
      case 'image':
        return <ImageField {...field} />
      case 'button':
        field['value'] = name
        field['onClick'] = this.props.triggerAction
        if (record && field.visible) {
          let val_visible = field.visible.split(',')
          if (val_visible.includes(record.state)) {
            return <ButtonForm {...field} />
          }
        } else {
          return <ButtonForm {...field} />
        }
        break
      default:
        console.log('Warning unknown type field!', name, field_type)
    }
  }
}

export default FactoryForm
