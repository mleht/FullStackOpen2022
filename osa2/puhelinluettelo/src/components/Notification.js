const Notification = ({ message, positive }) => {
    let style = "";

    if (message === null) {
      return null
    }
    if (positive === true) {
        style = "pos";
      } else {
        style = "neg";
      }
  
    return (
      <div className={style}>
        {message}
      </div>
    )
  }

  export default Notification