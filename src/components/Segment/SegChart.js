
import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'

import SegLabel from './SegLabel'
import SegLoader from './SegLoader'
import BarChart from 'components/Chart/BarChart'
import LineChart from 'components/Chart/LineChart'
import InfoChart from 'components/Chart/InfoChart'
import client from 'client'

function SegChart (props) {
  let [data, setData] = useState([])
  let [loading, setLoading] = useState(false)

  let component
  let mobileCol = 15
  let tabletCol = 7
  let computerCol = 7

  async function fetchToAPI() {
    let data
    if (!props.fake) {
      data = await client.proxy.report_data(props.id)
    } else {
      data = props.data
      console.log(props)
    }
    setLoading(false)
    setData(data)
  }

  function onClick(event, data) {
    setLoading(true)
    fetchToAPI()
  }


  if (loading) {
    component = <SegLoader {...props} />
  } else if (data.length === 0) {
    component = <SegLabel {...props} onClick={onClick} />
  } else {
    if (props.type === 'bar') {
      component = <BarChart {...props} data={data} />
    } else if (props.type === 'line') {
      component = <LineChart {...props} data={data} />
    } else if (props.type === 'info') {
      const option = data.selector[data.default_option]
      component = <InfoChart {...props} description={option} data={data} />
      if (data.value && data.value.length > 6) {
        computerCol = 7
      }
    }
  }
  return (
    <Grid.Column style={styles.column}
      mobile={mobileCol}
      tablet={tabletCol}
      computer={computerCol} >
      { component }
    </Grid.Column>
  )
}

const styles = {
  column: {
    marginBottom: 20,
  }
}

export default SegChart
