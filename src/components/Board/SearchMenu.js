
import React, { useState } from 'react'
import { Dropdown, Input, Form, Grid } from 'semantic-ui-react'

function SearchMenu (props) {
  const [edited, setEdited] = useState(props.value || false)

  function handleEdit(event, data) {
    setEdited(data.value)
    // props.onChange(props.name, data.checked, child)
  }

  return (
    <Grid.Column style={styles.search} width={5}>
      <Dropdown
        text='Search'
        icon='search'
        floating
        labeled
        button
        className='icon'
        style={styles.drop}
        closeOnChange={false}
        multiple={true}
      >
        <Dropdown.Menu
          key={props.name}
          name={props.name}
        >
         <Form style={styles.form}>
            <Form.Field style={styles.field}>
              <label>Periodo</label>
              <Input onClick={handleEdit}/>
            </Form.Field>
            <Form.Field style={styles.field}>
              <label>Lugar</label>
              <Input value={edited}/>
            </Form.Field>
          </Form>
        </Dropdown.Menu>
      </Dropdown>
    </Grid.Column>
  )
}

const styles = {
  form: {
    marginTop: 20,
    marginBottom: 20
  },
  drop: {
    width: 280,
  },
  field: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 5
  },
  search: {
    width: '50%',
    display: 'flex'
  }
}
export default SearchMenu
