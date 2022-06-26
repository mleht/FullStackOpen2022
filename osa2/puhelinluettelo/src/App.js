import {useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewfilter] = useState('')
  const [noticationMessage, setNotificationMessage] = useState(null)
  const [isPositive, setIsPositive] = useState('')

  useEffect(() => {
    /* axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data) */
      personService  // Palvelin kommunikointi siirretty omaan moduuliin ./services/persons
        .getAll()
        .then(response => {
          setPersons(response.data)
      })
  }, []) // Funktion useEffect toista parametria käytetään tarkentamaan sitä, miten usein efekti suoritetaan. Jos toisena parametrina on tyhjä taulukko [], suoritetaan efekti ainoastaan komponentin ensimmäisen renderöinnin jälkeen. https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect

  const handlePersonChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewfilter(event.target.value.toLowerCase());
  }

  const addPerson = (event) => {
    event.preventDefault(); // // estää lomakkeen lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi mm. sivun uudelleenlatautumisen
    // console.log("button clicked", event.target);
    const nameObject = {
      name: newName, number: newNumber
    };
    if(!persons.some(n => n.name.toLowerCase() === newName.toLowerCase() )) {
    /* axios
    .post('http://localhost:3001/persons', nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('') */
      personService  // Palvelin kommunikointi siirretty omaan moduuliin ./services/persons
      .create(nameObject)
      .then(response => {
        if (response.status === 201) {
          setIsPositive(true);
          setNotificationMessage(`${response.data.name} added`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
      }
    })
    }
    else {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const personToEdit = persons.find(p => p.name.toLowerCase() === nameObject.name.toLowerCase())
        let id = personToEdit.id
        const changedPerson = { ...personToEdit, number: newNumber }
        personService
        .update(id, changedPerson )
        .then((response) => {
          if (response.status === 200) {
            setIsPositive(true);
            setNotificationMessage(`number changed for ${newName}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.map(p => p.id !== id ? p : response.data))  // haetaan nimet uudelleen muutetun kanssa
          }
        }) 
        .catch(error => {
          setNotificationMessage(`Error: ${error}`)
            setTimeout(() => {
              setIsPositive(false);
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== id))
        }) 
        setNewName('')
        setNewNumber('')
        
      }
    }

  };

  const handleDeleteClick = (id) => {
    // console.log('You clicked button. ' + id);
    const personToDelete = persons.find((p) => p.id === id);
    // console.log(personToDelete)
    const confirm = window.confirm(
      `Are you sure you want to permanently remove: ${personToDelete.name}`
    );
    if (confirm) {
      // console.log("Confirmed")
      personService
      .remove(id)
      .then((response) => {
        if (response.status === 200) {
          setIsPositive(true);
          setNotificationMessage(`${personToDelete.name} removed`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== personToDelete.id)) // haetaan nimet uudelleen ilman poistettua
        }
      })
    }
  }

  return (
    <div>
      <Notification message={noticationMessage} positive={isPositive}/>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} onChangeFunc={handleFilterChange}/>
  
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} nameOnChange={handlePersonChange} numberValue={newNumber} numberOnChange={handleNumberChange}/>
      
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} handleDeleteClick={handleDeleteClick}/> 
    </div>
  )

}

export default App