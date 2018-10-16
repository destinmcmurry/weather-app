import React, { Component } from 'react';
import history from '../history';
import { getCity, updateForecast, getDayOfWeek, getVerdict } from '../localDb';
import './Details.css';

class Details extends Component {
  state = {
    city: getCity(this.props.match.params.placeId),
    fiveDay: [],
    displayErrorMsg: false
  }
  fetchAndUpdateForecast = city => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lng}&units=imperial&APPID=5d1cec29c6fbcd01c898cb29cd62ee4d`)
      .then(res => res.json())
      .then(data => updateForecast(city.placeId, data))
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
          let d = new Date();
          d = getDayOfWeek((d.getDay()+i+1)%7);
          let temp = ((+day.high) + (+day.low)) / 2;
          let verdict = getVerdict(temp, day.code);
          return (
          <div key={i} className='forecast-item'>
            <div className='day-container'>
              <span className='day'>{d}</span>
              <span className='verdict'>{verdict}</span>
            </div>
            <img src={`https://openweathermap.org/img/w/${day.icon}.png`} alt='weather-icon'/>
            <div className='high-low'>
              <span className='high'>{day.high}</span>
              <span className='low'>{day.low}</span>
            </div>
          </div>
          )
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
