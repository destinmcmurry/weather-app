import React from 'react';
import { Footer } from './components';
import Routes from './Routes';

const appStyle = {
  textAlign: 'center',
  margin: '25px 35px 0 35px',
  minWidth: '260px'
}

const headerStyle = {
  fontSize: '25px',
  height: '30px',
  marginBottom: '23px',
  minWidth: '200px',
  fontFamily: 'Montserrat, sans-serif'
}

const App = props => {
  return (
    <div style={appStyle}>
      <h1 style={headerStyle}>Weather Dashboard</h1>
      <Routes/>
      <Footer />
    </div>
  );
}

export default App;