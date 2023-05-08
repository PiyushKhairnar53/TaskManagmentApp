import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from 'react';
import ChangeStatusModal from "../Status/ChangeStatusModal";
import { Developer } from "../Developer/Developer";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IUser {
    developer: Developer;
    userRole:string
}

const UserProfileItem: React.FC<IUser> = ({ developer,userRole }) => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("User") || '{}');


    const handleSeeTasks = () => {
        if(userRole == 'Manager'){
        navigate('/manager/tasks/manager',
        {
            state: {
                targetUserId: developer.id,
                targetUserFirstName:developer.firstName,
                targetUserLastName:developer.lastName,
                targetUserRole:userRole
            }
        });
        }
        if(userRole == 'Developer'){
            navigate('/developer/tasks/developer',
            {
                state: {
                    targetUserId: developer.id,
                    targetUserFirstName:developer.firstName,
                    targetUserLastName:developer.lastName,
                    targetUserRole:userRole
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

export default UserProfileItem;