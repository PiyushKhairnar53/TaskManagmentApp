import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import '../App.css'
import '../index.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';
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
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const handleClose = () => {
        setShow(false);
    }

    const closeModal = (showValue: boolean) => {
        setShow(showValue);
    }

    const handleShow = () => setShow(true);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = () => {
        if (username && password) {
            axios.post(API_URL + "login", {
                username,
                password
            })
                .then(response => {

                    if (response.data.token) {
                        localStorage.setItem("User", JSON.stringify(response.data));
                        const user = JSON.parse(localStorage.getItem("User") || '{}');

                        if (user.role === "Manager") {
                            navigate("manager/dashboard");
                        }
                        else if (user.role === "Developer") {
                            navigate("developer/dashboard");
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    toast.warning('Username or password is wrong!', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });
        }
        else {
            toast.warning('Please fill all mandotary fields!', {
                position: toast.POSITION.TOP_RIGHT
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
                    <Row className="h-100 m-0 bg-white">
                        <div className="container-fluid">
                            <div>
                                <div className="row d-flex mt-3 mb-4">
                                    <div className="col-lg-6">
                                        <div className="card1 pb-5 mt-5">
                                            <div className="row justify-content-center">
                                                <FaCheckCircle className="check-logo" />
                                            </div>
                                            <div className="mt-2">
                                                <h1><strong>Task Manager</strong></h1>
                                                <p>Manage your tasks easily By using our solution <strong>Task Manager</strong></p>
                                            </div>
                                            <div className="row landing-image">
                                                <img className="image" src='/task.png' />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pl-3 col-lg-6 mt-5">
                                        <div className="card2 shadow card border-0 px-5 mt-5 pt-2">
                                            <h4 className="mt-2"><strong>Login</strong></h4>
                                            <div className="row pt-3">
                                                <label className="mb-1 mt-1 text-start"><h6 className="mb-0 text-start">Username</h6></label>
                                                <input className="mt-1" type="text" name="username"
                                                    placeholder="Enter a valid username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)} />
                                                <div className="d-flex justify-content-start">
                                                    {username == "" ? <p className="text-danger pt-2">Please enter the Username</p> : null}
                                                </div>
                                            </div>
                                            <div className="row pt-3">
                                                <label className="mb-1 mt-2"><h6 className="mb-0 text-start">Password</h6></label>
                                                <input name="password"
                                                    className="mt-1"
                                                    placeholder="Enter password"
                                                    value={password}
                                                    type={passwordShown ? "text" : "password"}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <div className='d-flex justify-content-between'>
                                                    <div>
                                                        {password == "" ? <p className="text-danger pt-2">Please enter the Password</p> : null}
                                                    </div>
                                                    <Button variant="transparent" className="btn text-primary" onClick={togglePassword}>Show Password</Button>
                                                </div>

                                            </div>

                                            <div className="d-flex justify-content-center row mb-3 mt-4">
                                                <Button type="submit" variant="primary" className="btn text-center" onClick={login}>Login</Button>

                                            </div>
                                            <div className="row pt-3 pb-4">
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
                    <RegisterUser ShowModal={closeModal} />
                </Modal>
                <ToastContainer />
            </React.Fragment>
        </div>
    );
};

export default LandingPage;