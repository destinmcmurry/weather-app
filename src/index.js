import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history';
import './index.css';
import App from './App';

ReactDOM.render(<Router history={history}><App /></Router>, document.getElementById('root'));



/* ping app every 5 mintues to keep awake */
const http = require('http');
setInterval(() => {
  http.get('https://cryptic-gorge-87239.herokuapp.com/');
}, 120000); 