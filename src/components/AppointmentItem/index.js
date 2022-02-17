// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarButoon} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickingStar = () => {
    toggleStarButoon(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-card">
      <div className="name-star-container">
        <p>{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={onClickingStar}
          testid="star"
        >
          <img src={starImgUrl} alt="star" />
        </button>
      </div>
      <p>Date {date}</p>
    </li>
  )
}

export default AppointmentItem
