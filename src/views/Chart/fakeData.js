
export const fakeDataBar = {
  name: 'Annual Sales',
  report_name: 'annual_sales',
  in_thousands: true,
  type: 'bar',
  meta: 'COP',
  data: {
    labels: ['2013', '2014', '2015', '2016', '2017', '2018', '2019'],
    values: [67, 55, 48, 90, 101, 110, 94],
  }
}

export const fakeDataLine = {
  name: 'New Customer in Month',
  report_name: 'new_customers_in_month',
  type: 'line',
  meta: 'COP',
  in_thousands: true,
  data: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
    values: [360, 550, 440, 301, 266, 208, 760],
  }
}

export const fakeDataInfo = {
  name: 'Bookings in Month',
  report_name: 'bookings_in_month',
  type: 'info',
  in_thousands: true,
  meta: 'COP',
  default_option: '2',
  data: {
    value: '34479',
    selector: {
      '1': { id: '1', name: 'January 2020' },
      '2': { id: '2', name: 'February 2020' },
      '3': { id: '3', name: 'March 2020' }
    }
  }
}
