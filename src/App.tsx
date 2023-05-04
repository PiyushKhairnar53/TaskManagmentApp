import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainContent from './Components/MainContent';
import Axios from 'axios';
import LandingPage from './RoutePages/LandingPage';
import ManagerHomePage from './RoutePages/Manager/ManagerHomePage';
import DeveloperHomePage from './RoutePages/Developer/DeveloperHomePage';
import { useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Protected from './Components/Protected';

function App() {


  const props:any = false;
  const [loading, setLoading] = useState(true);


  Axios.interceptors.request.use(function (request) {

    document.body.classList.add('loading-indicator');
    setLoading(true);
    return request
  }, function (error) {
    setLoading(false);
    document.body.classList.remove('loading-indicator');
    return Promise.reject(error);
  });
  
  Axios.interceptors.response.use(function (response) {

    document.body.classList.remove('loading-indicator');
    setLoading(false);
  
    return response;
  }, function (error) {
    document.body.classList.remove('loading-indicator');
    setLoading(false);
    return Promise.reject(error);
  });

  const Loader = (state = false, action:any) => {
    switch (action.type) {
        case "SHOW_LOADER":
            return action.data;
        case "HIDE_LOADER":
            return action.data;
        default:
            return state;
    }
  }

  return (
    <div className="App">
      { props.loader && Loader }
      <React.Fragment>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='manager/*' element={ <Protected> <ManagerHomePage /></Protected>} />
        <Route path="developer/*" element ={<Protected> <DeveloperHomePage/></Protected>}/>
       </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  );
}

export default App;
