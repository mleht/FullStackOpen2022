import Weather from "./Weather"

const Countries = ({filtered, handleSingle}) => {
  // console.log(filtered.length)
  let over10 = false 
  let one = false 
  let max10 = false
  if (filtered.length > 10 ){over10 = true }
  if (filtered.length === 1 ){one = true }
  if (filtered.length > 1 && filtered.length < 11 ){max10 = true }
  // console.log("over 10 " + over10)
  // console.log("one " + one)
  // console.log("max10 " + max10)
  return (
      <div>
          {over10 && (<p>Too many matches, specify another filter</p>)}

          {max10 && (
            filtered.map(country=> 
              <p key={country.name.common}> {country.name.common} <button onClick={handleSingle} value={country.name.common}>show</button></p> 
            )
          )}

          {one && (
          <>
            <h2>{filtered[0].name.common}</h2>
            <p>capital {filtered[0].capital}</p>
            <p>area {filtered[0].area}</p>
            <h3>languages:</h3>
            <ul>
              {Object.values(filtered[0].languages).map(language => (
                <li key={language}>{language}</li>
              ))}
            {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values */}
            </ul>
            <p><img src={filtered[0].flags.png}/></p>
            <Weather capital={filtered[0].capital} lat ={filtered[0].latlng[0]} lng={filtered[0].latlng[1]}/>
          </>
          )}
      </div>
  )
}

export default Countries