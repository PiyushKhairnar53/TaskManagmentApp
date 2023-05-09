import React from "react";
import dotnet from "./dotnet.png"
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import { debug } from "console";

const ProfilePage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userId = user.userId;
    const userRole = user.role;

    const [userData, setUserData] = useState<any>();

    const setUser = () => {

        if (userRole === 'Developer') {
            axios.get(`https://localhost:44316/api/Developer/${userId}`)
                .then(res => {
                    setUserData(res.data.data);
                })
                .catch(err => console.log(err))
        }

        if (userRole === 'Manager') {
            debugger
            axios.get(`https://localhost:44316/api/Manager/${userId}`)
                .then(res => {
                    setUserData(res.data.data);
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        setUser();
    }, []);


    return (
        <React.Fragment>
            <div className="shadow container bg-white ">
                    <div className="border-0">
                        <div className="d-flex justify-content-center m-4">
                            <div className="m-2">
                                <img className="profile-page-image" src='/profileavatar.png' alt="Profile" />
                            </div>
                            <div className="m-5">
                                <div>
                                <label className="card-text w-100 pb-1"><strong>Username : {userData && userData.username}</strong> </label>
                                <Button variant="warning" name="nextButton">Update Profile</Button>
                                </div>
                            </div>
                        </div>
                        <hr className="profile-divider"/>
                        <div className="d-flex justify-content-between">
                            <label className="card-text text-center"><strong>Name : {userData && userData.firstName} {userData && userData.lastName}</strong> </label>
                            <label className="card-text"><strong>Address : {userData && userData.address}</strong></label>
                        </div>
                        <hr className="profile-divider"/>
                        <div className="d-flex justify-content-between">
                            <label className="card-text"><strong> Phone number : {userData && userData.phoneNumber}</strong>  </label>
                            <label className="card-text"><strong>Email Id : {userData && userData.email}</strong></label>
                        </div>
                        <hr className="profile-divider"/>
                        {userData && <div className="d-flex justify-content-center">
                            <p className="card-text pb-5"><strong>About : {userData.bio}</strong></p>
                        </div>}
                    </div>
            </div>
        </React.Fragment>
    );
};

export default ProfilePage;