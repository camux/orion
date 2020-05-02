
import moment from 'moment'

moment.locale('es')

const month = moment().month()
var daysInMonth =  moment().month(month).daysInMonth()


function getValueDate(i) {
  const rawDate = moment().month(month).date(i)
  const formattedDate = rawDate.format('YYYY-MM-DD')
  const labelDate = rawDate.format('DD dd')
  const weekday = rawDate.isoWeekday()
  let color = 'white'
  if (weekday === 7) {
    color = 'rgb(255, 244, 196)'
  }
  return {formattedDate, labelDate, color}
}

function getHeaders() {
  var res = [
    {label: 'ID DOC', readOnly: true, width: '2%', align: 'left', paddingLeft: 5},
    {label: 'NOMBRE', readOnly: true, width: '15%', align: 'left', paddingLeft: 5},
    {label: 'LUGAR', readOnly: true, width: '10%', align: 'left', paddingLeft: 5},
  ]
  const readOnly = true
  const width = '1.8%'
  const align = 'center'
  for (var i = 1; i < daysInMonth + 1; i++) {
    const { formattedDate, labelDate, color } = getValueDate(i)
    res.push({value: formattedDate, label: labelDate, readOnly, width, align, color})
  }
  return res
}

const headers = getHeaders()

var empty_data = []
let rid = 0

const params = {
  sourceCol: 1,
  targetField: 'turn',
}

let readOnly = true
let grid_data = [
  [ {value: '001', readOnly}, {id: 174, value: 'HERNANDEZ PABLO ANTONIO', readOnly}, {value: 'CONDOMINIO VALENZZA', readOnly} ],
  [ {value: '002', readOnly}, {id: 175, value: 'REINALDO CORREA', readOnly}, {value: 'CONDOMINIO VALENZZA', readOnly} ],
  [ {value: '003', readOnly}, {id: 177, value: 'CAMACHO SILVA HERNANDO', readOnly}, {value: 'CONDOMINIO VALENZZA', readOnly} ],
  [ {value: '004', readOnly}, {id: 178, value: 'DELGADO BARRERA JUAN CARLOS', readOnly}, {value: 'CONDOMINIO VALENZZA', readOnly} ],
  [ {value: '005', readOnly}, {id: 179, value: 'DIAZ MARTINEZ RAMIRO ANDRES', readOnly}, {value: 'CONDOMINIO VALENZZA', readOnly} ],
]

let records = new Map([
  [(174, '2020-04-10'), { id: 23, guard: 174, date: '2020-04-10', turn: 2 }],
  [(174, '2020-04-11'), { id: 24, guard: 174, date: '2020-04-11', turn: 2 }],
  [(174, '2020-04-13'), { id: 25, guard: 174, date: '2020-04-13', turn: 1 }],
  [(178, '2020-04-15'), { id: 26, guard: 178, date: '2020-04-15', turn: 1 }],
  [(178, '2020-04-17'), { id: 27, guard: 178, date: '2020-04-17', turn: 1 }],
  [(178, '2020-04-13'), { id: 28, guard: 178, date: '2020-04-13', turn: 3 }]
])

let fullData = []
for (const d of grid_data) {
  const readOnly = false
  let datesValue = []
  for (var i = 1; i < daysInMonth + 1; i++) {
    const { formattedDate, color } = getValueDate(i)
    const matrixValue = records.get((d[params.sourceCol]['id'], formattedDate))
    let cell
    if (matrixValue) {
      cell = {id: matrixValue['id'], value: matrixValue[params.targetField], readOnly, color}
    } else {
      cell = {id: -1, value: '-', readOnly, color}
    }
    datesValue.push(cell)
  }
  fullData.push([...d, ...datesValue])
}

export default {headers, fullData, records, params}
