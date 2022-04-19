import React from 'react'
import '../styles/Calendar.css';
import { addDays, addMonths, subMonths, startOfWeek, endOfWeek, startOfMonth, parseISO, endOfMonth, format, isEqual, isSameMonth } from 'date-fns'

class Calendar extends React.Component {

  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  }

  renderHeader() {
    const dateFormat = 'MMMM yyyy'

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = 'EEE'
    const days = []

    let startDate = startOfWeek(this.state.currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      )
    }

    return <div className="days row">{days}</div>
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const dateFormat = 'd'
    const rows = []

    const dateValue = this.props.values
    let days = []
    let day = startDate
    let formattedDate = ''
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat)
        const reFormattedDate = format(day, 'yyyy-mm-dd')

        const filterDate = dateValue.filter(s => isEqual(parseISO(s.date), day))
        const cloneDay = day
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart) ? 'disabled' : ''
            } tooltip`}
            key={day}
            style={
              isSameMonth(day, monthStart) && filterDate.length
                ? { background: 'var(--practice-day)' }
                : null
            }
          >
            {!isSameMonth(day, monthStart) ? null : (
              <span>
                <span className="number">{formattedDate}</span>
                {this.props.toolTip ? <span className="tooltiptext">{reFormattedDate}</span> : null}
              </span>
            )}
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      )
      days = []
    }
    return <div className="body">{rows}</div>
  }

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    })
  }

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    })
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    )
  }
}

export default Calendar