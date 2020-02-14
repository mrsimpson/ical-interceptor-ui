import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick


import readJcalFromUrl from './readJcalFromUrl'
import retrieveEvents from './retrieveEvents'
import mapJcalToFullCalendarEvents from './mapJcalToFullCalendarEvents'

import './CalendarPreview.scss'

export default class CalendarPreview extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      calendarEvents: []
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.url && (this.props.url !== prevProps.url)) {
      try {
        const jCal = await readJcalFromUrl(this.props.url)
        const events = retrieveEvents(jCal)
        this.setState({ calendarEvents: mapJcalToFullCalendarEvents(events) })
      } catch (e) {
        console.log(e)
      }
    }
  }

  render() {
    return (
      <div className='preview'>
        <div className='preview-calendar'>
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
        <p className="source-url">Source: {this.props.url}</p>
      </div>
    )
  }
}
