import React from "react";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Navpages from "./Navpages";
import Sidebar from "./Sidebar";
import '../App.css'
import '../index.css'
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import LandingPage from "../RoutePages/LandingPage";
import LoggedInPage from "../RoutePages/LoggedInPage";

const MainContent = () => {

  const [authenticated, setAuthenticated] = useState<string>();

  useEffect(() => {
    // const loggedInUser = "authenticated";
    // if (loggedInUser === "authenticated") {
    //   setAuthenticated(loggedInUser);
    // }
    setAuthenticated("");

  }, []);
    
  const handlePage = () =>{
    if(!authenticated){
    setAuthenticated("authenticated");
    }
    else{
      setAuthenticated("");
    }
  }

  return (
    <div>
      <React.Fragment>
        {/* <Button variant="primary" onClick={handlePage}>Change Page</Button> */}
        <div>
          {!authenticated ?
            <LandingPage/>
          :
            <LoggedInPage/> 
          }
        </div>
      </React.Fragment>
    </div>
  );
};

export default MainContent;