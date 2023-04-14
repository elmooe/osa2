import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
      if (value) {
        axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(responce => {
          setCountries(responce.data)
        })
        .catch(error => {
          setCountries([])
        })
    } 
    setCountries([])
  }, [value])
  
  const handleChange = (event) => {
    setValue(event.target.value)
  } 

  const handleClick = name => {
    axios.get(`https://restcountries.com/v3.1/name/${name}`)
    .then(responce => {
      setCountries(responce.data)
    })
  }

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange} />
      </form>
       <Filter countries={countries} onClick={handleClick} />
    </div>
  )
} 

const Filter = ({ countries, onClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>Languages:</h3>
      <ul>
          {Object.values(country.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} width="150" />
        <h2>Weather in {country.name.common}</h2>
    </div>
    )
  } else if (countries.length > 1) {
    return (
      <ul>
      {countries.map(country => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => onClick(country.name.common)}>show</button>
        </li>
      ))}
    </ul>
    )
  }
}

export default App;
