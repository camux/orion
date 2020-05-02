
import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'

import SegmentCard from 'components/Chart/SegmentCard'

var options = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    xAxes: [{
      display: true,
        ticks: {
          beginAtZero:true
        },
    }],
    yAxes: [{
      display: true,
        ticks: {
          beginAtZero:true
      },
    }]
  },
  annotation: {
    annotations: [{
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      // value: '26',
      borderColor: 'tomato',
      borderWidth: 1
    }],
    drawTime: 'afterDraw' // (default)
  }
}

function LineChart({ ...props }) {

  const dataObj = {
    labels: props.data.labels,
    datasets: [{
      label: 'My Second dataset',
      fillColor: 'rgba(0,191,255,0.5)',
      strokeColor: 'rgba(0,191,255,0.8)',
      highlightFill: 'rgba(100,149,237,0.75)',
      highlightStroke: 'rgba(100,149,237,1)',
      data: props.data.values,
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: 'rgba(167, 245, 40, 0.7)',
    }]
  }

  return (
    <SegmentCard
      header={props.name}
      meta={props.meta}
      description={props.description}
      >
      <Line
        data={dataObj}
        width={150}
        height={100}
        options={options}
      />
    </SegmentCard>
  )
}

export default LineChart
