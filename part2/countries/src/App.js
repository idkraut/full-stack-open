import {useEffect, useState} from 'react';
import axios from 'axios';

const Search = ({country, onChange}) => {
  return (
    <form>
      find countries: <input value={country} onChange={onChange}></input>
    </form>
  )
}

const Country = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  let city = country.capital
  const [weather, setWeather] = useState('')

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`)
    .then(response => response.json())
    .then(json => setWeather({temp: json.main.temp, wind: json.wind.speed, icon: json.weather[0].icon}))
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => <li>{lang}</li>)}
      </ul>
      <img alt='flag' src={country.flags.png} width="150px" height="150px"></img>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{weather.temp}</p>
      <img alt="icon" src={`http://openweathermap.org/img/w/${weather.icon}.png`} width="100px" height="100px"></img>
      <p><b>wind: </b>{weather.wind}</p>
    </div>
  )
}

const CountryList = ({countries, onClick}) => {
  return (
    <div>
      {countries.map(country =>
      <p>{country}
        <button name={country} onClick={onClick}>show</button>
      </p>
      )}
    </div>
  )
}

const Countries = ({countries, onClick, weather}) => {
  console.log(countries)
  console.log(weather)
  if (!countries.length > 0) return <p></p>

  if (countries.length === 1) {
    const country = countries[0]
    console.log(country.languages)
    return (
      <Country country={country}></Country>
    )
  } else {
    countries = countries.map(country => country.name.common)
    return (
      <CountryList countries={countries} onClick={onClick}></CountryList>
    )
  }
}

const App = () => {
  const [newSearch, setNewSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const countriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }

  useEffect(countriesHook, []);

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value);
  }

  const countriesToShow = () => {
    let matches = newSearch
      ? countries.filter(country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()))
      : countries

    return matches
  }

  return (
    <div>
      <Search country={newSearch} onChange={handleSearch}></Search>
      <Countries
        countries={countriesToShow()}
        onClick={(event) => setNewSearch(event.target.name)}>
      </Countries>
    </div>
  );
}

export default App;
