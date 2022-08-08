// Write your code here
import './index.css'

const AppointmentItem = props => {
  console.log(props)
  const {appointmentDetails, isToggleChange} = props
  const {id, title, date, isStareed} = appointmentDetails

  const onChangeStar = () => {
    isToggleChange(id)
  }
  const changeStarred = isStareed
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="header-container">
        <p className="title">{title}</p>
        <button
          className="star-button"
          type="submit"
          testid="star"
          onClick={onChangeStar}
        >
          <img src={changeStarred} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date : {date}</p>
    </li>
  )
}

export default AppointmentItem
