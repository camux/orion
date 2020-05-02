
import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'

import SegChart from 'components/Segment/SegChart'
import { fakeDataInfo, fakeDataBar, fakeDataLine } from 'views/Chart/fakeData'

import client from 'client'
import { color } from 'theme'


function DashChart (props) {
  const [reports, setReports] = useState([])
  const [fake, setFake] = useState(false)

  async function getReports() {
    let records = await client.proxy.dash_reports()
    console.log(records)
    if (records.length === 0) {
      setFake(true)
      records = [fakeDataInfo, fakeDataBar, fakeDataLine]
    }
    setReports(records)
  }

  useEffect(() => {
    getReports()
  }, [])

  return (
    <Grid>
      <p style={styles.title}> Reports </p>
      <Grid.Row>
        { reports.map((r, key) => <SegChart fake={fake} key={key} {...r} />) }
      </Grid.Row>
    </Grid>
  )
}

const styles = {
  title: {
    fontSize: 'xx-large',
    fontWeight: 'bold',
    marginBottom: 10,
    color: color.grayDark
  }
}

export default DashChart
