import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { getCities, addCity, updateWeather, removeCity } from '../localDb';
import './Overview.css';

class Overview extends Component {
  state = {
    cityInput: '',
    cities: getCities(),
    displayLimitReachedMsg: false,
    displayErrorMsg: false
  }
  handleChange = cityInput => {
    this.setState({ cityInput });
  }
  fetchAndUpdateWeather = city => {
    geocodeByAddress(city.name)
      .then(results => getLatLng(results[0]))
      .then(latLng =>
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lng}&APPID=5d1cec29c6fbcd01c898cb29cd62ee4d`)
      )
      .then(res => res.json())
      .then(data => {
        let temp = ((data.main.temp - 273.15) * (9/5) + 32).toFixed(0);
        updateWeather(city.placeId, temp);
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
    if (this.state.cities.length === 5) {
      this.setState({ displayLimitReachedMsg: true, cityInput: '' })
    }
    else {
      this.setState({ displayLimitReachedMsg: false, displayErrorMsg: false })
      addCity(name, placeId);
      this.fetchAndUpdateWeather({name, placeId});
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
        <small id='error-message' className={this.state.displayLimitReachedMsg || this.state.displayErrorMsg ? `visible` : `hidden` }>{this.state.displayErrorMsg ? 
         `sorry, something went wrong! try choosing a different listing for the city you want` : `sorry, no more than five cities allowed! please delete a city before adding a new one`}</small>
        <div className='CityList'>
          {this.state.cities.length
            ?
            this.state.cities.map(city => {
              let firstCommaIdx = city.name.indexOf(',');
              let endIdx = city.name.indexOf(',', firstCommaIdx+1);
              if (endIdx !== -1) city.name = city.name.slice(0, endIdx);
              return (
                <div key={city.placeId}>
                  <Link className='city-name' key={city.placeId} to={`/details/${city.placeId}`}>{city.name}</Link>
                  {
                    city.weather.temp && <p className='city-temp'>{city.weather.temp}°F</p>
                  }
                </div>
              )
            }
            )
            :
            <small className='city-name'>no cities yet.</small>
          }
        </div>
      </div>
    );
  }
}

export default Overview;
