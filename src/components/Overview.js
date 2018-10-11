import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlacesAutoComplete from 'react-places-autocomplete';
import './Overview.css';

class Overview extends Component {
  state = {
    cityInput: '',
    cities: []
  }
  handleChange = cityInput => {
    this.setState({ cityInput });
  }
  handleSelect = (city, placeId) => {
    this.setState({ 
      cityInput: '',
      cities: [...this.state.cities, { id: placeId, name: city }]
    });
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
              if (endIdx !== -1) city.name = city.name.slice(0, endIdx)
              return (
                <Link key={city.id} to={`/details/${city.id}`}>
                  <p>{city.name}</p>
                </Link>
              )
            }
            )
            :
            <small>no cities in your dashboard yet.</small>
          }
        </div>
      </div>
    );
  }
}

export default Overview;
