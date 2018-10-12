import React from 'react';
import { Footer } from './components';
import Routes from './Routes';
import './App.css';

const App = props => {
  return (
    <div>
      <div className='heading'>
      <h1 className='header'>Whether</h1>
      <h4 className='sub-header'>the weather's good</h4>
      </div>
      <Routes/>
      <Footer />
    </div>
  );
}

export default App;