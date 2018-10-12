import React from 'react';
import { Footer } from './components';
import Routes from './Routes';

const headingStyle = {
  padding: '10px 0 18px 0',
  textAlign: 'center',
  boxShadow: '#000000cf 0px 1px 17px -5px',
  borderRadius: '0 0 5px 5px',
  marginBottom: '7px'
}

const headerStyle = {
  fontSize: '55px',
  height: '61px',
  margin: '0',
  minWidth: '200px',
  fontFamily: 'Courgette, cursive'
}

const subheaderStyle = {
  margin: '0',
  fontWeight: '900',
  fontSize: '11px',
  letterSpacing: '4px'
}

const App = props => {
  return (
    <div>
      <div style={headingStyle}>
      <h1 style={headerStyle}>Whether</h1>
      <h4 style={subheaderStyle}>to go outside</h4>
      </div>
      <Routes/>
      <Footer />
    </div>
  );
}

export default App;