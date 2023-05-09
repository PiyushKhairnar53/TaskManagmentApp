import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LandingPage from './RoutePages/LandingPage';
import ManagerHomePage from './RoutePages/Manager/ManagerHomePage';
import DeveloperHomePage from './RoutePages/Developer/DeveloperHomePage';
import { Route, Routes } from 'react-router-dom';
import Protected from './Components/Protected';
import Loader from './Config/Loader';

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.interceptors.request.use(function (request) {
      setLoading(true);
      return request
    }, function (error) {
      setLoading(false);
      document.body.classList.remove('loading-indicator');
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      setLoading(false);
      return response;
    }, function (error) {
      document.body.classList.remove('loading-indicator');
      setLoading(false);
      return Promise.reject(error);
    });
  },[]);


  return (
    <div className="App">
      {loading ? <Loader /> : ""}
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='manager/*' element={<Protected> <ManagerHomePage /></Protected>} />
            <Route path="developer/*" element={<Protected> <DeveloperHomePage /></Protected>} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
