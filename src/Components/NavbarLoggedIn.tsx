import React from "react";
import dotnet from "./dotnet.png"
import "bootstrap/dist/css/bootstrap.min.css";


const NavbarLoggedIn = () => {
  return (
    <React.Fragment>
    <nav className="navbar navbar-logged-in bg-white">
      <div className="dropdown text-end profile-img">
        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
          data-bs-toggle="dropdown" aria-expanded="true">User
        </a>

        <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
          <li><a className="dropdown-item" href="#">User name</a></li>
          <li><hr className="dropdown-divider"></hr></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
    </nav>
  </React.Fragment>
  );
};

export default NavbarLoggedIn;