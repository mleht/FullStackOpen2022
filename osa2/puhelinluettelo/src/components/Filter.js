const Filter = (props) => {
    return (
        <div>filter shown with <input value={props.filter} onChange={props.onChangeFunc}/></div>
    )
  }
  
  export default Filter