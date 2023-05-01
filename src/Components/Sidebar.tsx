import React from 'react'
import { NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaArrowAltCircleDown, FaArrowCircleDown, FaCheckCircle } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Button } from 'react-bootstrap';


const Sidebar = () => {
    return (

        <div className="sidebar primary-color">

            <div key={0}>
                <ul className='side-tab'>
                    <li className='app-name'>
                        <NavLink to={'/'} className="navlink">
                            <h4 className="navbar-title"><FaCheckCircle className="check-logo-sidebar"/> Task Manager</h4>
                        </NavLink>
                    </li>
                    <li>
                        <Button className="btn btn-toggle collapsed mt-3" variant='dark' data-bs-toggle="collapse" data-bs-target="#profile-collapse" aria-expanded="false">
                            <strong >Matters</strong> <FaArrowCircleDown />
                        </Button>
                        <div className="collapse bg-white mt-1" id="profile-collapse">
                            <ul className="btn-toggle-nav p-2 list-unstyled">
                                <li><NavLink to="RoutePages/AddTask" className="bg-white text-decoration-none rounded text-dark">Create new Matter</NavLink></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;