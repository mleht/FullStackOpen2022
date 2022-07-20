import { connect } from 'react-redux' 
import { searchFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.searchFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  searchFilter                          // importoitu filterReducerista ja välitetään propsina Filter-komponentille
}

const ConnectedFilter = connect(        // connect-funktion toisena parametrina voidaan määritellä mapDispatchToProps eli joukko action creator -funktioita, jotka välitetään yhdistetylle komponentille propseina
  null,                                 // Koska komponentti ei tarvitse storen tilasta mitään, on connect-funktion ensimmäinen parametri null.
  mapDispatchToProps
)(Filter)

export default ConnectedFilter

/*

Alla Redux-storea käytetään  useSelector-hookin avulla. Yllä taas connect-funktionlla

import { useDispatch } from "react-redux";  
import { searchFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(searchFilter(event.target.value))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter

*/