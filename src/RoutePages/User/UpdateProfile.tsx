import React from "react";
import { useEffect, useState } from "react";
import '../../App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import '../../index.css';


const UpdateProfile = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');

    console.log("Manager home - " + user.token + " " +user.role);
 
    return (
        <>
         <div className="route-page-bg">
                  <h4>Update Profile</h4>
            </div>
        </>
    )
};

export default UpdateProfile;