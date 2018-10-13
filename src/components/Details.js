import React, { Component } from 'react';
import history from '../history';
import { getCity, updateForecast, getDayOfWeek } from '../localDb';
import './Details.css';

class Details extends Component {
  state = {
    city: getCity(this.props.match.params.placeId),
    displayErrorMsg: false
  }
  fetchAndUpdateForecast = city => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lng}&units=imperial&APPID=5d1cec29c6fbcd01c898cb29cd62ee4d`)
      .then(res => res.json())
      .then(data => {
        let days = data.list.map(day => (
          {
            high: day.main.temp_max.toFixed(0),
            low: day.main.temp_min.toFixed(0),
            icon: day.weather[0].icon,
          }
        ));
        updateForecast(city.placeId, days);
      })
      .then(()=> this.setState({
        city: getCity(city.placeId)
      }))
      .catch(err => {
        console.log(err);
        this.setState({
          displayErrorMsg: true
        })
      });
  }
  componentDidMount() {
    this.fetchAndUpdateForecast(this.state.city);
  }
  render() {
    const { name, weather } = this.state.city;
    const { temp, humidity, pressure, description } = weather;
    return (
      <div className='Details'>
        <button className='go-back' onClick={()=>history.push('/')}>˂</button>
        <h2 className='details-city-name'>{name}</h2>
        <p className='details-description'>{description}</p>
        <h1 className='details-city-temp'>{temp}°F</h1>
        <div className='forecast'>
        {this.state.city.forecast &&
          this.state.city.forecast.map((day, i) => {
            // had to do this for now because was getting 401 error for 16day forecast API call
            if (i % 7 === 0 && i !== 0) {
              let d = new Date();
              d = getDayOfWeek(Math.floor(d.getDay()+(i/7))%7);
              return (
              <div key={i} className='forecast-item'>
                <span className='day'>{d}</span>
                <img src={`http://openweathermap.org/img/w/${day.icon}.png`} alt='weather-icon'/>
                <div className='high-low'>
                  <span className='low'>{day.low}</span>
                  <span className='high'>{day.high}</span>
                </div>
              </div>
              )
            }
          })
        }
        </div>
        <p className='humidity'>humidity: {humidity}%</p>
        <p className='pressure'>pressure: {pressure}hPa</p>
      </div>
    );
  }
}

export default Details;
