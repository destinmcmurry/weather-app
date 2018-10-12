import React from 'react';
import history from '../history';
import { getCityName } from '../localDb';
import './Details.css';

const Details = props => {
  const { placeId } = props.match.params;
  const city = getCityName(placeId);
  return (
    <div className='Details'>
      <h2 className='city-name-details'>{city}</h2>
      <div className='forecast'>
        <p>10-day Forecast</p>
      </div>
      <button className='go-back' onClick={()=>history.push('/')}>↩</button>
    </div>
  );
}

export default Details;
