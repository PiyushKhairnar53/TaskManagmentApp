import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Navpages from "../../Components/Navpages";
import Sidebar from "../../Components/Sidebar";
import '../../App.css';
import '../../index.css'
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Components/Footer";
import NavbarLoggedIn from "../../Components/NavbarLoggedIn";

const DeveloperHomePage = () => {

    const user = JSON.parse(localStorage.getItem("user") || '{}');
    console.log("Role of user - "+user.role);
    console.log("token - "+user.token);
    console.log("userId - "+user.userId);

    return (
        <div>
            <React.Fragment>
                <div className="route-page-bg">
                    <Row className="h-100 m-0">
                        <Col sm={2} className="m-0 p-0">
                            <Sidebar />
                        </Col>
                        <Col sm={10} className="mr-0 p-0">
                            <NavbarLoggedIn/>
                            <Col >
                                <Navpages/>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        </div>
    );
};

export default DeveloperHomePage;