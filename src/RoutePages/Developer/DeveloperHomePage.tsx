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
import DeveloperDashboard from "./DeveloperDashboard";
import Sidebar from "../../Components/Sidebar";
import ViewAllDevelopers from "./ViewAllDevelopers";
import ViewAllManagers from "../Manager/ViewAllManagers";
import SeeDeveloperTasks from "./SeeDeveloperTasks";
import SeeManagerTasks from "../Manager/SeeManagerTasks";
import ProfilePage from "../User/ProfilePage";

const DeveloperHomePage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
   
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
                            <Route path="dashboard" element={<DeveloperDashboard />} />
                            <Route path="task/updateTask" element={<UpdateTaskDeveloper />} />
                            <Route path="/viewAllManagers" element={<ViewAllManagers />} />
                            <Route path="/viewAllDevelopers" element={<ViewAllDevelopers />} />
                            <Route path = "tasks/developer" element={<SeeDeveloperTasks/>}/>
                            <Route path = "tasks/manager" element={<SeeManagerTasks/>}/>
                            <Route path = "/profile" element={<ProfilePage/>}/>
                        </Routes>
                        </Col>
                    </Row>
            </div>
        </>
    )
};

export default DeveloperHomePage;