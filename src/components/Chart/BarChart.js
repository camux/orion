
import React from "react"
import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'

import SegmentCard from 'components/Chart/SegmentCard'

var options = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: true,
    callbacks: {
      label: function(t, d) {
         let xLabel = d.datasets[t.datasetIndex].label
         return xLabel + ': ' + t.yLabel.toLocaleString()
      }
    }
  },
  scales: {
    xAxes: [{
      display: true,
        ticks: {
          beginAtZero:true
        },
      gridLines: {
        display: false,
      }
    }],
    yAxes: [{
      display: true,
      gridLines: {
        // color: 'rgb(231, 143, 37, 0.5)'
      },
      ticks: {
        beginAtZero:true,
        callback: function(value, index, values) {
          return value.toLocaleString()
        }
      },
    }]
  },
  annotation: {
    annotations: [{
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: '26',
      borderColor: 'tomato',
      borderWidth: 1
    }],
    drawTime: 'afterDraw' // (default)
  }
}

function BarChart({ ...props }) {

  const dataObj = {
    labels: props.data.labels, //['2013', '2014', '2015', '2016', '2017', '2018', '2019'],
    datasets: [{
      label: 'Valor',
      fillColor: 'rgba(0, 191, 255, 0.5)',
      strokeColor: 'rgba(0, 191, 255, 0.8)',
      highlightFill: 'rgba(100, 149, 237, 0.75)',
      highlightStroke: 'rgba(100, 149, 237, 1)',
      data: props.data.values,
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(141, 193, 75, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 110, 134, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    }]
  }

  return (
    <SegmentCard
      header={props.name}
      description={props.description}
      meta={props.data.meta}
      in_thousands={props.data.in_thousands}
      >
      <Bar data={dataObj} width={150} height={100} options={options} />
    </SegmentCard>
  )
}

export default BarChart
