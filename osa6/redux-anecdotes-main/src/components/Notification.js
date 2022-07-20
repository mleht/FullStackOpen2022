import { connect } from 'react-redux' 

const Notification = (props) => {
  const notification = props.notification_connect_test
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
    {notification? 
      <div style={style}> {notification} </div> : '' }
    </>
  )
}

const mapStateToProps = (state) => {                          //   This function selects parts of the Redux state and passes it in as props to the component that connect() is applied to
  return {                                                    //   Eli tässä tapauksessa Notification saa propsina notificationRecuderin staten
    notification_connect_test: state.notificationReducer
  }
}

export default connect(mapStateToProps)(Notification)

/*

Alla Redux-storea käytetään  useSelector-hookin avulla. Yllä taas connect-funktionlla

import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notificationReducer)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
    {notification? 
      <div style={style}> {notification} </div> : '' }
    </>
  )
}

export default Notification

*/