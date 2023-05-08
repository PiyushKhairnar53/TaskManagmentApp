import React from "react";
import dotnet from "./dotnet.png"
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { Button, Form } from 'react-bootstrap';
import { ToastContainer } from "react-toastify";

const ProfilePage = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userId = user.userId;
    const userRole = user.role;
    console.log("user id profile*** - " + userId + " - " + userRole)

    const [userData, setUserData] = useState<any>();

    const setUser = () => {

        if (userRole === 'Developer') {
            axios.get(`https://localhost:44316/api/Developer/${userId}`)
                .then(res => {
                    setUserData(res.data.data);
                    console.log(userData)
                    console.log(userData.firstName)
                    console.log(userData.lastName)
                })

                .catch(err => console.log(err))
        }

        if (userRole === 'Manager') {
            axios.get(`https://localhost:44316/api/Manager/${userId}`)
                .then(res => {
                    setUserData(res.data.data);
                    console.log(userData)
                    console.log(userData.firstName)
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
            <div className="text-center mt-2">
                <h4>Task</h4>
            </div>
            <Form>
                <Form.Group className="p-3" controlId="exampleForm.ControlInput1">
                    <h6 className='d-flex justify-content-start form-label'>Title</h6>
                    <Form.Control type="text" placeholder="Add User Registration" name="title"  required />
                </Form.Group>

                <Form.Group className='p-3'
                    controlId="exampleForm.ControlTextarea1">
                    <h6 className='d-flex justify-content-start form-label'>Description</h6>
                    <Form.Control as="textarea" rows={3} placeholder='Registration feature in ABC application' name="description" required />
                </Form.Group>

                
                
                <Form.Group className='p-3'
                    controlId="exampleForm.ControlTextarea1">
                    <h6 className='d-flex justify-content-start form-label'>Select Priority</h6>
                    <Form.Select aria-label="Matter priority" name="priority">
                        <option value="Select-Priority" disabled>Select-Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Form.Select>
                </Form.Group>

               

            </Form>
            <div className='d-flex justify-content-end'>
                <Button className='w-25 m-3' variant="primary" name="nextButton" >Update Profile</Button>
            </div>
            <ToastContainer />
            </div>
        </React.Fragment>
    );
};

export default ProfilePage;