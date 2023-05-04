import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import '../App.css'
import '../index.css'
import { FaCheck,FaCheckCircle,FaCheckDouble,FaCheckSquare } from 'react-icons/fa';
import { Modal } from "react-bootstrap";
import RegisterUser from "../RoutePages/Authentication/RegisterUser";
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/Footer";
import axios from "axios";

const API_URL = "https://localhost:44316/api/Authentication/";

const LandingPage = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
    }

    const closeModal = (showValue : boolean) =>
    {
        setShow(showValue);
    }

    const handleShow = () => setShow(true);  
 
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        if (username && password) {
            axios.post(API_URL + "login", {
                username,
                password
            })
                .then(response => {

                    if (response.data.token) {

                        console.log("Token : " + response.data.token);
                        console.log("Role: " + response.data.role);
                        console.log("User Id: " + response.data.userId);
    
                        localStorage.setItem("User", JSON.stringify(response.data));
                        console.log("Local Storage: " + localStorage.getItem("User"));
                        const user = JSON.parse(localStorage.getItem("User") || '{}');
    
                        if(user.role === "Manager")
                        {
                            console.log("Role: " + user.role);
                            navigate("manager/dashboard");
                        }
                        else if(user.role === "Developer")
                        {
                            console.log("Role: " + user.role);
                            navigate("developer/dashboard");
                        }
                    }
                });
        }
    };

    return (
        <div>
            <React.Fragment>
                <div>
                    <Navbar />
                </div>
                <div>
                    <Row className="h-100 m-0">
                        <div className="container-fluid p-4">
                            <div className="card card0 border-0">
                                <div className="row d-flex ">
                                    <div className="col-lg-6">
                                        <div className="card1 pb-5 mt-5">
                                            <div className="row justify-content-center">
                                                <FaCheckCircle className="check-logo"/>
                                            </div>
                                            <div className="mt-2">
                                                <h1><strong>Task Manager</strong></h1>
                                                <p>Manage your tasks easily By using our solution <strong>Task Manager</strong></p>
                                            </div>
                                            <div className="row landing-image">
                                                <img className="image" src="https://www.shutterstock.com/image-vector/two-developers-planning-their-work-600w-421328629.jpg" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6">
                                        <div className="card2 card border-0 px-4 py-5">
                                            <div className="row pt-3">
                                                <label className="mb-1"><h6 className="mb-0 text-sm">Username</h6></label>
                                                <input className="mb-4" type="text" name="username"
                                                    placeholder="Enter a valid username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)} />
                                                {username == "" ? <p className="text-danger font-weight-bold">Please enter the Username</p> : null}

                                            </div>
                                            <div className="row pt-3">
                                                <label className="mb-1"><h6 className="mb-0 text-sm">Password</h6></label>
                                                <input type="password" name="password"
                                                    placeholder="Enter password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                {password == "" ? <p className="text-danger font-weight-bold">Please enter the Password</p> : null}
                                            </div>

                                            <div className="d-flex justify-content-center row mb-3 mt-5">
                                                <Button type="submit" variant="primary" className="btn text-center" onClick={login}>Login</Button>
                                            </div>
                                            <div className="row mb-4 pt-3">
                                                <small className="font-weight-bold">Don't have an account? <strong><a className="text-primary" onClick={handleShow}>Register</a></strong> </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
                <div className="bg-blue py-4">
                    <div className="row px-3">
                        <Footer />
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <RegisterUser ShowModal={closeModal}/>
                </Modal>
            </React.Fragment>
        </div>
    );
};

export default LandingPage;