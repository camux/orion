
import React from 'react'
import { ViewTypes } from 'react-big-scheduler'
import moment from 'moment'

function CellHeaderTemplate (schedulerData, item, formattedDateItems, style) {
  let datetime = schedulerData.localeMoment(item.time)
  let isCurrentDate = false

  if (schedulerData.viewType === ViewTypes.Day) {
      isCurrentDate = datetime.isSame(new Date(), 'hour')
  }
  else {
      isCurrentDate = datetime.isSame(new Date(), 'day')
  }

  if (isCurrentDate) {
      style.backgroundColor = '#61b9fa'
      style.color = 'white'
  }
  const formattedItem = moment(item.time).format("DD/MMM");

  return (
    <th key={item.time} className={`header3-text`} style={style}>
      { formattedItem }
    </th>
  )
}

export default CellHeaderTemplate
