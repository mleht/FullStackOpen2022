import axios from 'axios'
import {useEffect, useState } from 'react'

const Weather = ({capital, lat, lng}) => {
    const [weatherData, setWeatherData] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)
    
    const api_key = process.env.REACT_APP_API_KEY
    let weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
	lat + 
	"&lon=" +
	lng +
    "&units=metric" +
	"&appid=" +
	api_key

    useEffect(() => {
        axios
          .get(weatherUrl)
          .then(response => {
            setWeatherData(response.data)
            setDataLoaded(true)
          })
      }, [])
	
   
    return (
       <div>
        {dataLoaded && (
        <>
        <h2>Weather in {capital}</h2>
        <p>temperature: {weatherData.main.temp} Celsius</p>
        <p><img src={"http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"}/></p> 
        <p>wind: {weatherData.wind.speed} m/s</p>  
        </>
        )}
        </div>
    )
  }
  
  export default Weather