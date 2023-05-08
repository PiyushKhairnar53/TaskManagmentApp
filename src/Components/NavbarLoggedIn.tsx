import React from "react";
import dotnet from "./dotnet.png"
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarLoggedIn = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User") || '{}');
  const userRole = user.role;

  const logoutUser = () =>{
      localStorage.removeItem("User");
      navigate("/");
      window.location.reload();
  }

  const seeProfile = () => {
    if(userRole === 'Manager'){
      navigate("/manager/profile");
    }
    if(userRole === 'Developer'){
      navigate("/developer/profile");
    }
  }

  return (
    <React.Fragment>
    <nav className="navbar-logged-in bg-white">
      <div className="d-flex justify-content-end profile-img">
      <div className="dropdown col-md-2 text-end">
          <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" onClick={seeProfile} >Profile</a></li>
            <hr/>
            <li><a className="dropdown-item" onClick={logoutUser} >Sign out</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </React.Fragment>
  );
};

export default NavbarLoggedIn;