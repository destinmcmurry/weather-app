import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { getCities, addCity, updateWeather, removeCity, getVerdict } from '../localDb';
import './Overview.css';

class Overview extends Component {
  state = {
    cityInput: '',
    cities: getCities(),
    displayLimitReachedMsg: false,
    displayErrorMsg: false,
    displayDuplicateCityMsg: false
  }
  handleChange = cityInput => {
    this.setState({ cityInput });
  }
  fetchAndUpdateWeather = city => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&units=imperial&APPID=5d1cec29c6fbcd01c898cb29cd62ee4d`)
      .then(res => res.json())
      .then(data => {
        let temp = data.main.temp.toFixed(0);
        let high = data.main.temp_max.toFixed(0);
        let low = data.main.temp_min.toFixed(0);
        updateWeather(city.placeId, temp, high, low, data.weather[0].icon, data.weather[0].description, data.main.humidity, data.main.pressure, data.weather[0].id);
      })
      .then(()=> this.setState({
        cityInput: '',
        cities: getCities()
      }))
      .catch(err => {
        console.log(err);
        this.setState({
          displayErrorMsg: true
        })
        removeCity(city.placeId)
      });
  }
  handleSelect = (name, placeId) => {
    let lng, lat;
    if (this.state.cities.length === 5) {
      this.setState({ displayLimitReachedMsg: true, cityInput: '' })
    } else if (this.state.cities.find(city => city.placeId === placeId)) {
      this.setState({ displayDuplicateCityMsg: true, cityInput: '' })
    } else {
      this.setState({ displayLimitReachedMsg: false, displayErrorMsg: false, displayDuplicateCityMsg: false });
      geocodeByAddress(name)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          lat = latLng.lat;
          lng = latLng.lng;
          return addCity(name, placeId, lat, lng)
        })
        .then(() => this.fetchAndUpdateWeather({name, placeId, lat, lng}))
        .catch(err => {
          console.log(err);
          this.setState({
            displayErrorMsg: true
          })
        });
    }
  }
  componentDidMount() {
    this.state.cities.forEach(city => {
      this.fetchAndUpdateWeather(city);
    });
    this.setState({
      cities: getCities()
    })
  }
  render() {
    return (
      <div className='Overview'>
        <small id='error-message' className={this.state.displayLimitReachedMsg || this.state.displayErrorMsg || this.state.displayDuplicateCityMsg ? `visible` : `hidden` }>{this.state.displayErrorMsg ? 
        `sorry, something went wrong! try refreshing` : this.state.displayDuplicateCityMsg ? `sorry, you already have that city!` : `limit reached: please delete a city before adding a new one` }</small>
        <div className='SearchBar'>
          <PlacesAutoComplete
            value={this.state.cityInput}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={{ types: ['(cities)'] }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'search cities',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions &&
                    suggestions.map(suggestion => {
                      return (
                        <div key={suggestion.id} {...getSuggestionItemProps(suggestion)}>
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            )}
          </PlacesAutoComplete>
        </div>
        <div className='CityList'>
          {this.state.cities.length
            ?
            this.state.cities.map(city => {
              let firstCommaIdx = city.name.indexOf(',');
              let endIdx = city.name.indexOf(',', firstCommaIdx+1);
              if (endIdx !== -1) city.name = city.name.slice(0, endIdx);
              return (
                <div className='CityItem' key={city.placeId}>
                  <button className='remove-city' onClick={() => {
                    removeCity(city.placeId); 
                    this.setState({ cities: getCities(), displayLimitReachedMsg: false }) 
                  }}>x</button>
                  <div className='city-name'>
                    <Link to={`/details/${city.placeId}`}>{city.name}</Link>
                    <small className='verdict'>({getVerdict(city.weather.temp, city.weather.code)})</small>
                  </div>
                  { city.weather.temp &&
                  <Link className='city-weather-overview' to={`/details/${city.placeId}`}>
                    <img src={`http://openweathermap.org/img/w/${city.weather.icon}.png`} alt='weather-icon' className='weather-icon'/>
                    <span className='city-temp'>{city.weather.temp}°F</span>
                  </Link>
                  }
                </div>
              )
            }
            )
            :
            <small>no cities yet.</small>
          }
        </div>
      </div>
    );
  }
}

export default Overview;
