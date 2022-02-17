// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isFiltered: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitData = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  toggleStarButoon = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  filteredStarred = () => {
    this.setState(prevState => ({isFiltered: !prevState.isFiltered}))
  }

  getStarredList = () => {
    const {appointmentsList} = this.state
    return appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
  }

  render() {
    const {title, date, appointmentsList, isFiltered} = this.state
    const starredButtonClass = isFiltered ? 'active-star' : ''

    const displayAppointmentsList = isFiltered
      ? this.getStarredList()
      : appointmentsList

    console.log(displayAppointmentsList)

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-container">
            <div>
              <form onSubmit={this.onSubmitData} className="form-carousal">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  className="input-class"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  className="input-class"
                  value={date}
                  onChange={this.onChangeDate}
                />
                <button type="submit" className="btn">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="appointment-section">
            <h1>Appointments</h1>
            <button
              type="button"
              className={`star-filter-button ${starredButtonClass}`}
              onClick={this.filteredStarred}
            >
              Starred
            </button>
          </div>
          <div>
            <ul className="appointments-container">
              {displayAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  toggleStarButoon={this.toggleStarButoon}
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
