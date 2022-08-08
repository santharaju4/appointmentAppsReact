// Write your code here
import {Component} from 'react'

import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  filterAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachFilter => eachFilter.isStareed === true,
      )
    }
    return appointmentsList
  }

  isToggleChange = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachValue => {
        if (id === eachValue.id) {
          return {...eachValue, isStareed: !eachValue.isStareed}
        }
        return eachValue
      }),
    }))
  }

  onAddSubmit = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formateDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4,
      title: titleInput,
      date: formateDate,
      isStareed: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTitleValue = event => {
    this.setState({titleInput: event.target.value})
  }

  onchangeDateValue = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state

    const filterClassName = isFilterActive ? 'filter-field' : 'filter-empty'

    const filterAppointmentLists = this.filterAppointmentList()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="appointments-container">
            <div className="add-appointments-container">
              <form className="form" onSubmit={this.onAddSubmit}>
                <h1 className="add-appointment-heading">Add Appointment</h1>
                <label className="label" htmlFor="input">
                  TITLE
                </label>
                <input
                  className="input-container"
                  type="text"
                  id="input"
                  placeholder="Title"
                  value={titleInput}
                  onChange={this.onChangeTitleValue}
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  className="input-container"
                  type="date"
                  id="date"
                  placeholder="dd/mm/yyyy"
                  value={dateInput}
                  onChange={this.onchangeDateValue}
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
            <hr className="line" />
            <div className="header-with-filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="list-item">
              {filterAppointmentLists.map(eachItem => (
                <AppointmentItem
                  appointmentDetails={eachItem}
                  isToggleChange={this.isToggleChange}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
