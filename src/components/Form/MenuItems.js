
import React from 'react'
import { Menu } from 'semantic-ui-react'

function setItems (records) {
  let res = records.map((record) =>
    <Menu.Item
      key={record.id}
      name={record.name}
      value={record.id}>
      {record.name}
    </Menu.Item>
  )
  return res
}

export default setItems
