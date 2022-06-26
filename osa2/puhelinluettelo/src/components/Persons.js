const Persons = ({persons, newFilter, handleDeleteClick}) => {
    return (
        <div>
            {/* eslint-disable-next-line  */}
            {persons.map((person) => {
                const caseInsensName = person.name.toLowerCase();
                if (caseInsensName.indexOf(newFilter) > -1) {  /* method returns -1 if the value is not found */
              return (
                <p key={person.name}> {person.name} {person.number} <button onClick={() => handleDeleteClick(person.id)}>Delete</button></p>
                )}
            })}
        </div>
    )
  }
  
  export default Persons