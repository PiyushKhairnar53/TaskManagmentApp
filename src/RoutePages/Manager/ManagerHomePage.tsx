import React from "react";
import { useEffect, useState } from "react";
import '../../App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import '../../index.css';
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLoggedIn from "../../Components/NavbarLoggedIn";
import AddTask from "../Task/AddTask";
import ManagerDashboard from "./ManagerDashboard";
import ViewAllDevelopers from "../Developer/ViewAllDevelopers";
import Sidebar from "../../Components/Sidebar";
import ViewAllManagers from "./ViewAllManagers";
import SeeManagerTasks from "./SeeManagerTasks";
import SeeDeveloperTasks from "../Developer/SeeDeveloperTasks";
import ProfilePage from "../User/ProfilePage";

const ManagerHomePage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');

    console.log("Manager home - " + user.token + " " +user.role);
 
    return (
        <>
         <div className="route-page-bg">
                    <Row className="h-100 m-0">
                        <Col sm={2} className="m-0 p-0">
                        <Sidebar />
                        </Col>
                        <Col sm={10} className="mr-0 p-0">
                        <NavbarLoggedIn />
                        <Routes>
                            <Route path="dashboard" element={<ManagerDashboard />} />
                            <Route path="task/addTask" element={<AddTask />} />
                            <Route path="/viewAllManagers" element={<ViewAllManagers/>}/>
                            <Route path="/viewAllDevelopers" element={<ViewAllDevelopers />} />
                            <Route path = "/tasks/manager" element={<SeeManagerTasks/>}/>
                            <Route path = "/tasks/developer" element={<SeeDeveloperTasks/>}/>
                            <Route path = "/profile" element={<ProfilePage/>}/>
                        </Routes>
                        </Col>
                    </Row>
            </div>
        </>
    )
};

export default ManagerHomePage;