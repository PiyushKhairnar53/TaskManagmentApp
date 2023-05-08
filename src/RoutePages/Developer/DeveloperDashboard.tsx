import React, { createContext } from "react";
import '../../index.css'
import { useState, useEffect } from 'react';
import '../../App.css'
import axios from "axios";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { FaPlus, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TaskByStatus } from "../Task/TaskByStatus";
import TaskItem from "../Task/TaskItem";
import FormText from "react-bootstrap";
import { TaskByStatusDeveloper } from "../Task/TaskByStatusDeveloper";
import { Manager } from "../Manager/Manager";

interface IStatusManager {
    userId: string,
    statusId: number
}
interface IStatusManagerDeveloper {
    managerId: string,
    developerId: string,
    statusId: number
}

const APIBASEURL = 'https://localhost:44316/api/Task/GetTasksByStatusDeveloper';
const FORDDEVELOPERAPIBASEURL = 'https://localhost:44316/api/Task/GetTasksByStatusDeveloperForManager';


const DeveloperDashboard = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userId = user.userId;

    const statusTodo: IStatusManager = { userId: userId, statusId: 1 }
    const statusInProgress: IStatusManager = { userId: userId, statusId: 2 }
    const statusCodeReview: IStatusManager = { userId: userId, statusId: 3 }
    const statusCompleted: IStatusManager = { userId: userId, statusId: 4 }

    const [todoTasks, setTodoTasks] = useState<TaskByStatusDeveloper[]>([]);
    const [inProgress, setInProgress] = useState<TaskByStatusDeveloper[]>([]);
    const [codeReview, setCodeReview] = useState<TaskByStatusDeveloper[]>([]);
    const [completed, setCompleted] = useState<TaskByStatusDeveloper[]>([]);
    const [managers, setManagers] = useState<Manager[]>([]);

    const getManagers = () => {

        axios.get('https://localhost:44316/api/Manager/GetAllManagers')
            .then(res => {
                setManagers(res.data.data)
                getData();
            })
            .catch(err => console.log(err))
    }

    const handleChangeDeveloper = (e: any) => {

        if (e.value) {
            console.log("changed manager - " + e.value);
            debugger
            const statusTodoDeveloper: IStatusManagerDeveloper = { managerId: e.value, developerId: userId, statusId: 1 }
            const statusInProgressDeveloper: IStatusManagerDeveloper = { managerId: e.value, developerId: userId, statusId: 2 }
            const statusCodeReviewDeveloper: IStatusManagerDeveloper = { managerId: e.value, developerId: userId, statusId: 3 }
            const statusCompletedDeveloper: IStatusManagerDeveloper = { managerId: e.value, developerId: userId, statusId: 4 }

            getDataForManager(statusTodoDeveloper,statusInProgressDeveloper,statusCodeReviewDeveloper,statusCompletedDeveloper);
        }
        else {
            getData();
        }
    }

    const getDataForManager = (statusTodoForDev: IStatusManagerDeveloper, statusInProgressDev: IStatusManagerDeveloper,
        statusCodeReviewDev: IStatusManagerDeveloper, statusCompletedDev: IStatusManagerDeveloper) => {
        axios.post(FORDDEVELOPERAPIBASEURL, statusTodoForDev)
            .then(res => {
                setTodoTasks(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post(FORDDEVELOPERAPIBASEURL, statusInProgressDev)
            .then(res => {
                setInProgress(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post(FORDDEVELOPERAPIBASEURL, statusCodeReviewDev)
            .then(res => {
                setCodeReview(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post(FORDDEVELOPERAPIBASEURL, statusCompletedDev)
            .then(res => {
                setCompleted(res.data.data);
            })
            .catch(err => console.log(err))
    }


    const getData = () => {
        axios.post(APIBASEURL, statusTodo)
            .then(res => {
                setTodoTasks(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post(APIBASEURL, statusInProgress)
            .then(res => {
                setInProgress(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post(APIBASEURL, statusCodeReview)
            .then(res => {
                setCodeReview(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post(APIBASEURL, statusCompleted)
            .then(res => {
                setCompleted(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const refreshData = (e:any) =>{
        if(e.value == true){
        getData();
        }
    }

    useEffect(() => {
        getManagers();
    }, []);

    return (
        <div>
            <div className="row">
                <div className="d-flex justify-content-between">
                    <h3 className="manager-dashboard">Developer</h3>
                    <div className='w-50 p-1 mt-2 sort-margin'>
                        <label className="text-start sort-by">Sort By Manager</label>
                        <Form.Select className='text-center mt-1' aria-label="Matter" name="developerId"
                            defaultValue="Select-Developer" onChange={(e) => handleChangeDeveloper(e.target)}>
                            <option value="">All</option>
                            {managers.map((item: Manager) => {
                                return (<option key={item.id} value={item.id} >
                                    {item.firstName} {item.lastName}</option>);
                            })}
                        </Form.Select>
                    </div>
                </div>
            </div>
            <div className="m-3">
                <div>
                    <div className="row">
                        <div className="container col m-2 task-list-bg">
                            <h4>To do</h4>
                            {todoTasks.map((element: TaskByStatusDeveloper, index) => {
                                return (
                                    // <div className="col-md-8" key={index}>
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName} developerId={element.developerId} 
                                        createdAt={element.updatedAt} statusId={1} actualTime={element.actualTime} refresh={getData} />
                                    // </div>
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>In progress</h4>
                            {inProgress.map((element: TaskByStatusDeveloper, index) => {
                                return (
                                    // <div className="col-md-8" key={index}>
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                    managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName} developerId={element.developerId} 
                                    createdAt={element.updatedAt} statusId={2} actualTime={element.actualTime} refresh={getData} />
                                 // </div>
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>Code review</h4>
                            {codeReview.map((element: TaskByStatusDeveloper, index) => {
                                return (
                                    // <div className="col-md-8" key={index}>
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                    managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName} developerId={element.developerId} 
                                    createdAt={element.updatedAt} statusId={3} actualTime={element.actualTime} refresh={getData} />
                                    // </div>
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>Completed</h4>
                            {completed.map((element: TaskByStatusDeveloper, index) => {
                                return (
                                    // <div className="col-md-8" key={index}>
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                    managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName} developerId={element.developerId} 
                                    createdAt={element.updatedAt} statusId={4} actualTime={element.actualTime} refresh={getData} />
                                    // </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DeveloperDashboard;