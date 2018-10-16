import React, { Component } from 'react';
import history from '../history';
import './NotFound.css';

class NotFound extends Component {
  state = {
    seconds: 4
  }
  countdown = () => {
    if (this.state.seconds < 2) {
      history.push('/');
    } else {
     this.setState({ seconds: this.state.seconds-1 })
     setTimeout(this.countdown, 1500)
    }
  }
  componentDidMount() {
    this.countdown();
  }
  render() {
    return (
      <div className='not-found-page'>
        <img src={`https://openweathermap.org/img/w/09d.png`} alt='weather-icon' className='not-found-weather-icon'/>
        <h4 className='not-found-message'>Sorry to rain on your parade, but this isn't one of your cities</h4>
        <p>taking you home in</p>
        <p>{this.state.seconds}</p>
      </div>
    )
  }
}

export default NotFound;