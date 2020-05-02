
import React from 'react'
import { FormattedMessage as FM } from 'react-intl'
import { Grid, Icon, Dropdown } from 'semantic-ui-react'

function FilterTable (props) {
  if (!props.filterTags) return null
  return (
    <Grid.Column style={styles.rowFilter} width={5}>
      <Dropdown
        trigger={<FM id={props.filterValue} />}
        icon={
            <Icon name='filter' style={{color: 'white', backgroundColor: 'crimson'}}/>
          }
        floating
        labeled
        button
        className='icon'
      >
        <Dropdown.Menu>
          {props.filterTags.map(option => (
            <Dropdown.Item key={option.value} {...option} onClick={props.onClickFilter} />
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <p style={styles.recordsMsg}>(&nbsp;{props.countRecords}&nbsp;)&nbsp;<FM id={'board.records_found'} /></p>
    </Grid.Column>
  )
}

const styles = {
  recordsMsg: {
    marginLeft: 20,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  rowFilter: {
    display: 'flex'
  }
}

export default FilterTable
