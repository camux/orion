
import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import 'react-big-scheduler/lib/css/style.css'
import moment from 'moment'
import 'components/Scheduler/scheduler.css'

import ItemPopoverTemplate from 'components/Scheduler/ItemPopoverTemplate'
import CellHeaderTemplate from 'components/Scheduler/CellHeaderTemplate'
import proxy from 'proxy'


class QuickScheduler extends Component {
  constructor (props) {
    super(props)
    this.searchRecords = this.searchRecords.bind(this)
    this.prevClick = this.prevClick.bind(this)
    this.nextClick = this.nextClick.bind(this)
    this.onSelectDate = this.onSelectDate.bind(this)
    this.onViewChange = this.onViewChange.bind(this)
    this.eventClicked = this.eventClicked.bind(this)
    const { ctxView } = props

    let date_formatted = new moment().format(DATE_FORMAT)
    const showAgenda = false
    const isEventPerspective = false
    const newBehaviors = undefined
    let schedulerData = new SchedulerData(date_formatted, ViewTypes.Month,
      showAgenda, isEventPerspective, {
        eventItemPopoverEnabled: true,
        views: [
          {viewName: 'Month', viewType: ViewTypes.Month, showAgenda: false, isEventPerspective: false},
          {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
        ]
      }, newBehaviors, moment
    )

    schedulerData.config.schedulerWidth = '80%'
    schedulerData.config.resourceName = 'HABITACIONES'
    // schedulerData.config.eventItemHeight = 33

    this.state = {
      schedulerData: schedulerData,
      order: ctxView['order'],
      orderBy: ctxView['order_by'],
      fields: ctxView['webtree'],
      calendar: ctxView['calendar'],
    }
  }

  async componentDidMount () {
    const { schedulerData } = this.state
    this.getRecords(schedulerData.start_date)
  }

  async getRecords (start_date) {
    const { model } = this.props
    const { schedulerData } = this.state

    // const args = {
    //   start_date: start_date
    // }
    const res = await proxy.get_method(model, 'get_calendar')
    const resources = res[0]
    const events = res[1]

    schedulerData.setResources(resources)
    schedulerData.setEvents(events)

    this.setState({
      schedulerData: schedulerData
    })
  }

  prevClick = (schedulerData)=> {
    schedulerData.prev();
    this.getRecords(schedulerData.startDate)
  }

  nextClick = (schedulerData)=> {
    schedulerData.next()
    console.log('On NEXT view on change YEEEEE')
    this.getRecords(schedulerData.startDate)
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective)
    this.getRecords(schedulerData.startDate)
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date)
    console.log('Cambiaste la fecha ? ', schedulerData.startDate)
    this.getRecords()
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`)
  }

  onClickSeeCalendar = async (event, data) => {
    // this.props.handleFilter(data.value)
    console.log('Activate Calendar...')
  }

  async searchRecords (value) {
    this.props.searchRecords(value)
  }

  render () {
    const { schedulerData } = this.state
    return (
      <Grid.Row>
        <Button basic icon='sync' color='teal' />
        <Grid.Column style={styles.col} width={12}>
          <Scheduler
            style={styles.scheduler}
            schedulerData={schedulerData}
            prevClick={this.prevClick}
            nextClick={this.nextClick}
            onSelectDate={this.onSelectDate}
            onViewChange={this.onViewChange}
            eventItemClick={this.eventClicked}
            nonAgendaCellHeaderTemplateResolver={CellHeaderTemplate}
            eventItemPopoverTemplateResolver={ItemPopoverTemplate}
          />
        </Grid.Column>
      </Grid.Row>
    )
  }
}

const styles = {
  scheduler: {
    padding: '5%'
  },
  col: {
    display: 'table',
    paddingLeft: 0
  }
}

export default DragDropContext(HTML5Backend)(QuickScheduler)
