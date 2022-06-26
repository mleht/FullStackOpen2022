import {useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewfilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewfilter(event.target.value.toLowerCase());
    setFilteredCountries(countries.filter((country) => 
    country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    )
  }

  const handleSingleCountry = (event) => {
    const value = event.target.value;
    // console.log('You clicked button. ' + value);
    setNewfilter(event.target.value.toLowerCase());
    setFilteredCountries(countries.filter((country) => 
    country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    )
  }
  
  return (
    <div>
      <Filter filter={newFilter} onChangeFunc={handleFilterChange}/>
      <Countries filtered={filteredCountries} handleSingle={handleSingleCountry} />
    </div>
  );
}

export default App;
