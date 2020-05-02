
import React from 'react'

import SegmentCard from 'components/Chart/SegmentCard'

function InfoChart({ ...props }) {
  let value = props.data.value
  if (value) {
    value = Number(value).toLocaleString(undefined, {maximumFractionDigits: 0})
  }
  return (
    <SegmentCard
      header={props.name}
      description={props.description}
      in_thousands={props.data.in_thousands}
      meta={props.meta} >
      <p style={styles.value}> {value} </p>
    </SegmentCard>
  )
}

const styles = {
  value: {
    fontSize: 72,
    marginBottom: 5,
    textAlign: 'center',
    color: '#56bcdf',
    fontWeight: 'bold'
  }
}

export default InfoChart
