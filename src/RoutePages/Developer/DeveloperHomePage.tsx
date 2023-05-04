import React from "react";
import { useEffect, useState } from "react";
import '../../App.css';
import { Routes, Route } from "react-router-dom";
import '../../index.css';
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Components/Footer";
import NavbarLoggedIn from "../../Components/NavbarLoggedIn";
import UpdateTaskDeveloper from "./UpdateTaskDeveloper";
import SidebarManager from "../../Components/SidebarManager";
import DeveloperDashboard from "./DeveloperDashboard";
import SidebarDeveloper from "../../Components/SidebarDeveloper";

const DeveloperHomePage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    console.log("Role of user - " + user.role);
    console.log("token - " + user.token);
    console.log("userId - " + user.userId);

    return (
        <>
         <div className="route-page-bg">
                    <Row className="h-100 m-0">
                        <Col sm={2} className="m-0 p-0">
                        <SidebarDeveloper />
                        </Col>
                        <Col sm={10} className="mr-0 p-0">
                        <NavbarLoggedIn />
                        <Routes>
                            <Route path="dashboard" element={<DeveloperDashboard />} />
                            <Route path="task/updateTask" element={<UpdateTaskDeveloper />} />
                        </Routes>
                        </Col>
                    </Row>
            </div>
        </>
    )
};

export default DeveloperHomePage;