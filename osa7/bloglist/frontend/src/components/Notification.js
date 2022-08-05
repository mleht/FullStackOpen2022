import PropTypes from 'prop-types'
import Alert from 'react-bootstrap/Alert'

const Notification = ({ message, positive }) => {
  let style = ''

  if (message === null) {
    return null
  }
  if (positive === true) {
    style = 'success'
  } else {
    style = 'danger'
  }

  return (
    <div className="container">
      <Alert variant={style}>{message}</Alert>
    </div>
  )
}

Notification.displayName = 'Notification'

Notification.propTypes = {
  positive: PropTypes.bool.isRequired,
}

export default Notification
