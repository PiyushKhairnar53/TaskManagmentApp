import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Navpages from "../../Components/Navpages";
import Sidebar from "../../Components/Sidebar";
import '../../App.css';
import { Routes, Route } from "react-router-dom";
import '../../index.css'
import Dashboard from "../Dashboard";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Components/Footer";
import NavbarLoggedIn from "../../Components/NavbarLoggedIn";
import AddTask from "../Task/AddTask";
import SidebarManager from "../../Components/SidebarManager";
import ManagerDashboard from "./ManagerDashboard";

const ManagerHomePage = () => {

    const user = JSON.parse(localStorage.getItem("user") || '{}');
    console.log("Role of user - " + user.role);
    console.log("token - " + user.token);
    console.log("userId - " + user.userId);

    return (
        <>
         <div className="route-page-bg">
                    <Row className="h-100 m-0">
                        <Col sm={2} className="m-0 p-0">
                        <SidebarManager />
                        </Col>
                        <Col sm={10} className="mr-0 p-0">
                        <NavbarLoggedIn />
                        <Routes>
                            <Route path="dashboard" element={<ManagerDashboard />} />
                            <Route path="task/addTask" element={<AddTask />} />
                        </Routes>
                        </Col>
                    </Row>
            </div>
        {/* <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-10">
            <Routes>
                <Route path="home" element={<ManagerDashboard />} />
                <Route path="task/addTask" element={<AddTask />} />
            </Routes>
            </div>
        </div> */}
        </>
    )
};

export default ManagerHomePage;