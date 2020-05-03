
import moment from 'moment'

// const FMT_DATETIME = '%Y-%b-%d-  %I:%M %p'
const re = /^[0-9]+$/

const fmtDate = (value, convert) => {
  if (value) {
    let value_ = moment(value)
    value_ = value_.format('DD-MM-YYYY')
    return value_
  }
}

const fmtDatetime = (value) => {
  if (value) {
    const value_ = moment(new Date(value)).format('YYYY-MM-DD HH:mm')
    return value_
  }
}

const fmtDatetimeForm = (value) => {
  if (value) {
    let val = moment.utc(value).toDate()
    const value_ = moment(val).format('DD-MM-YYYY HH:mm')
    return value_
  }
}

const dateToday = () => {
  return moment().format('YYYY-MM-DD')
}

const fmtDate2Tryton = (value) => {
  if (value) {
    return moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD')
  }
}

const fmtDateAndTime2Tryton = (dt, tm) => {
  const datetm = dt + ' ' + tm
  const dateutc = moment(datetm, 'DD-MM-YYYY HH:mm A')
  const _datetm = dateutc.utc()
  return _datetm.format('YYYY-MM-DD HH:mm:ss')
}

const fmtDatetime2Tryton = (value, fromDb) => {
  if (value) {
    let _date
    if (fromDb) {
      _date = moment(value, 'YYYY-MM-DDTHH:mm')
    } else {
      const dateutc = moment(value, 'DD-MM-YYYY HH:mm')
      _date = dateutc.utc()
    }
    let dateFormatted = _date.format('YYYY-MM-DD HH:mm:ss')
    return dateFormatted
  }
}

const fmtCurrency = (value) => {
  return value.toLocaleString('es', {useGrouping: true})
}

const isNumber = (value) => {
  return value === '' || re.test(value)
}

const getDatabase = () => {
  let database = ''
  const paths = window.location.pathname.split('/')
  if (paths[1] === 'web') {
    database = paths[2]
  } else {
    database = paths[1]
  }
  return database
}

const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
        var r = Math.random() * 16 | 0;
        var v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

const tools = {
  fmtCurrency,
  fmtDate,
  fmtDatetime,
  fmtDatetimeForm,
  fmtDate2Tryton,
  fmtDatetime2Tryton,
  isNumber,
  dateToday,
  fmtDateAndTime2Tryton,
  getDatabase,
  uuid4
}

export default tools
