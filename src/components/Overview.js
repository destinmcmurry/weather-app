import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlacesAutoComplete from 'react-places-autocomplete';
import { getCities, addCity, updateTemp } from '../localDb';
import './Overview.css';

class Overview extends Component {
  state = {
    cityInput: '',
    cities: getCities()
  }
  handleChange = cityInput => {
    this.setState({ cityInput });
  }
  fetchAndUpdateTemp = city => {
    let cityName = city.name.slice(0, city.name.indexOf(','));
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=5d1cec29c6fbcd01c898cb29cd62ee4d`)
    .then(res => res.json())
    .then(data => {
      let temp = ((data.main.temp - 273.15) * (9/5) + 32).toFixed(0);
      updateTemp(city.placeId, temp);
    })
    .then(()=> this.setState({
      cityInput: '',
      cities: getCities()
    }))
    .catch(err => console.log(err));
  }
  handleSelect = (name, placeId) => {
    addCity(name, placeId);
    this.fetchAndUpdateTemp({name, placeId});
  }
  componentDidMount() {
    this.state.cities.forEach(city => {
      this.fetchAndUpdateTemp(city);
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
                    city.temp && <p>{city.temp}</p>
                  }
                </div>
              )
            }
            )
            :
            <small className='city-name'>empty.</small>
          }
        </div>
      </div>
    );
  }
}

export default Overview;
