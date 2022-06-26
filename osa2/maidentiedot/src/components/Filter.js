const Filter = ({filter, onChangeFunc}) => {
    return (
        <div>Find countries <input value={filter} onChange={onChangeFunc}/></div>
    )
  }
  
  export default Filter