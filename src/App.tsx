import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainContent from './Components/MainContent';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <BrowserRouter>
          <MainContent/>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
