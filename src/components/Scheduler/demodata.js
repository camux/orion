
//set resources here or later
let resources = [
  {
    id: 'r0',
    name: 'Resource 0',
    groupOnly: true
  }, {
    id: 'r1',
    name: 'Resource 1'
  }, {
    id: 'r2',
    name: 'Resource 2',
    parentId: 'r0'
  }, {
    id: 'r3',
    name: 'Resource 3',
    parentId: 'r4'
  }, {
    id: 'r4',
    name: 'Resource 4',
    parentId: 'r2'
  },
]

let events = [
  {
    id: 1,
    resourceId: 'r1',
    start: '2019-09-18',
    end: '2019-09-19',
    title: 'I am finished',
    bgColor: '#d45757'
  }, {
    id: 2,
    resourceId: 'r2',
    start: '2019-09-18 12:30:00',
    end: '2019-09-26 23:30:00',
    title: 'I am not resizable',
    resizable: false
   }, {
    id: 3,
    resourceId: 'r3',
    start: '2019-09-19 12:30:00',
    end: '2019-09-20 23:30:00',
    title: 'I am not movable',
    movable: false
   }, {
    id: 4,
    resourceId: 'r1',
    start: '2019-09-19 14:30:00',
    end: '2019-09-20 23:30:00',
    title: 'I am not start-resizable',
    startResizable: false
   }, {
    id: 5,
    resourceId: 'r2',
    start: '2019-09-19 15:30:00',
    end: '2019-09-20 23:30:00',
    title: 'R2 has recurring tasks every week on Tuesday, Friday',
    // rrule: 'FREQ=WEEKLY;DTSTART=20191219T013000Z;BYDAY=TU,FR',
    bgColor: '#f759ab'
  }
]

export default {resources, events}
