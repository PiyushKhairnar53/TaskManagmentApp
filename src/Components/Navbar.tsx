import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Navbar = () => {

  return (
    <React.Fragment>
      <nav className="navbar">
        <h4 className="navbar-title">Task Manager</h4>
        <div>
          <Button variant="transparent" className="btn text-white pr-2">Login</Button>
          <Button variant="transparent" className="btn text-white pr-2">Register</Button>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;