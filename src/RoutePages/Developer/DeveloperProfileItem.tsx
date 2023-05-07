import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from 'react';
import ChangeStatusModal from "../Status/ChangeStatusModal";
import { Developer } from "./Developer";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IDeveloper {
    developer: Developer;
    userRole:string
}

const DeveloperProfileItem: React.FC<IDeveloper> = ({ developer,userRole }) => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("User") || '{}');


    const handleSeeTasks = () => {
        if(user.role == 'Manager'){
        navigate('/manager/user/tasks',
        {
            state: {
                targetUserId: developer.id,
                targetUserFirstName:developer.firstName,
                targetUserLastName:developer.lastName,
                targetUserRole:userRole
            }
        });
        }
        if(user.role == 'Developer'){
            navigate('/developer/user/tasks',
            {
                state: {
                    targetUserId: developer.id,
                    targetUserFirstName:developer.firstName,
                    targetUserLastName:developer.lastName
                }
            });
        }
    }

    return (
        <div className="my-4">
            <Card >
                <div className="card-body">

                    <div>
                    <img className="profile-icon" src='/profileIcon.png' alt="Profile"/>
                    </div>
                    <label className="card-text text-center"><strong>{developer.firstName} {developer.lastName}</strong> </label>
                    <div className="d-flex justify-content-start">
                    </div>
                    <div className="row">
                        <label className="card-text">Phone number - <strong>{developer.phoneNumber}</strong> </label>
                    </div>

                    <div className="row mt-2">
                        <div className="col">
                            <label className="card-text">Email Id : <strong>{developer.email}</strong></label>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <p className="card-text ">About : {developer.bio}</p>
                    </div>

                    <div className="row mt-2">
                        <div>
                            <button className="btn btn-primary" onClick={handleSeeTasks}>
                                See Tasks
                            </button>
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default DeveloperProfileItem;