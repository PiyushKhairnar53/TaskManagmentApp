import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import '../App.css'
import '../index.css'
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/Footer";
import axios from "axios";

const API_URL = "https://localhost:44316/api/Authentication/";

const LandingPage = () => {

    const [username, serUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = async () => {
        if (username && password) {
            axios.post(API_URL + "login", {
                username,
                password
            })
                .then(response => {
                    if (response.data.token) {
                        localStorage.setItem("user", JSON.stringify(response.data));
                        console.log("login : " + response.data.token);
                        console.log("local storage - " + localStorage.getItem("user"));
                        const user = JSON.parse(localStorage.getItem("user") || '{}');
                        console.log("role - "+user.role);
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
                        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                            <div className="card card0 border-0">
                                <div className="row d-flex">
                                    <div className="col-lg-6">
                                        <div className="card1 pb-5">
                                            <div className="row">
                                                <img className="image" src="https://i.imgur.com/CXQmsmF.png" />
                                            </div>
                                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                                <img className="image" src="https://i.imgur.com/uNGdWHi.png" />
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
                                                    onChange={(e) => serUsername(e.target.value)} />
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
                                                <small className="font-weight-bold">Don't have an account? <strong><a className="text-primary">Register</a></strong> </small>
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
                {/* <div>
                    <Footer />
                </div> */}
            </React.Fragment>
        </div>
    );
};

export default LandingPage;