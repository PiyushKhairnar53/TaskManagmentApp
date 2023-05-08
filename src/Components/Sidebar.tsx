import React from 'react'
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaCheckCircle } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaClipboard,FaUserFriends } from 'react-icons/fa';

const SidebarDeveloper = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userRole = user.role;
    console.log('sidebar developer - '+userRole)

    const navigate = useNavigate();
    return (
        <div className="sidebar primary-color">
            <div key={0}>
                <ul className='side-tab'>
                    <li className='app-name'>
                        {userRole == 'Developer' && 
                        <NavLink to={'../developer/dashboard'} className="navlink">
                            <h4 className="navbar-title"><FaCheckCircle className="check-logo-sidebar" /> Task Manager</h4>
                        </NavLink>}
                        {userRole == 'Manager' && 
                          <NavLink to={'../manager/dashboard'} className="navlink">
                          <h4 className="navbar-title"><FaCheckCircle className="check-logo-sidebar" /> Task Manager</h4>
                      </NavLink>
                      }
                    </li>
                </ul>
            </div>

            <div key={1}>
                <ul className='side-tab'>
                    {userRole == 'Developer' && 
                    <li>
                        <FaClipboard/>
                        <Button variant='transparent' className="sidebar-items text-white" onClick={() => navigate("../developer/dashboard")}>
                        <strong>Dashboard</strong></Button>
                    </li>}
                    {userRole == 'Manager' && 
                      <li>
                      <FaClipboard/>
                      <Button variant='transparent' className="sidebar-items text-white" onClick={() => navigate("../manager/dashboard")}>
                      <strong>Dashboard</strong></Button>
                  </li>}

                    <hr />

                    {userRole == 'Developer' && 
                    <li>
                        <FaUserFriends/>
                        <Button variant='transparent' className="sidebar-items text-white" onClick={() => navigate("../developer/viewAllManagers")}>
                        <strong>Managers</strong></Button>
                    </li>}

                    {userRole == 'Manager' && 
                    <li>
                        <FaUserFriends/>
                        <Button variant='transparent' className="sidebar-items text-white" onClick={() => navigate("../manager/viewAllManagers")}>
                        <strong>Managers</strong></Button>
                    </li>}

                    <hr/>

                    {userRole == 'Developer' && 
                    <li>
                        <FaUserFriends/>
                        <Button variant='transparent' className="sidebar-items text-white" onClick={() => navigate("../developer/viewAllDevelopers")}>
                        <strong>Developers</strong></Button>
                    </li>   }   
                    {userRole == 'Manager' && 
                    <li>
                    <FaUserFriends/>
                    <Button variant='transparent' className="sidebar-items text-white"  onClick={() => navigate("../manager/viewAllDevelopers")}>
                    <strong>Developers</strong></Button>
                </li>    
                }               
                </ul>
            </div>
        </div>
    );
};
export default SidebarDeveloper;