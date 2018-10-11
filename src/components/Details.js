import React from 'react';
import history from '../history';
import { getCityName, removeCity } from './storageUtils';
import './Details.css';

const Details = props => {
  const { placeId } = props.match.params;
  const city = getCityName(placeId);
  return (
    <div className='Details'>
      <div className='forecast'>
        <h2>{city}</h2>
        <p>10-day Forecast</p>
        <ul>
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
          <li>Thursday</li>
          <li>Friday</li>
          <li>Saturday</li>
          <li>Sunday</li>
          <li>Monday</li>
          <li>Tuesday</li>
          <li>Wednesday</li>
        </ul>
      </div>
      <button className='go-back' onClick={()=>history.push('/')}>↩</button>
      <button className='remove-city' onClick={() => {
        removeCity(placeId);
        history.push('/');
      }}>x</button>
    </div>
  );
}

export default Details;
