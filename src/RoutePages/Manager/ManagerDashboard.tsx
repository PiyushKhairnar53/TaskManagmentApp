import React, { createContext } from "react";
import '../../index.css'
import { useState, useEffect } from 'react';
import '../../App.css'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Form } from "react-bootstrap";
import { FaPlus, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TaskByStatus } from "../Task/TaskByStatus";
import TaskItem from "../Task/TaskItem";
import { Developer } from "../Developer/Developer";

interface IStatusManager {
    userId: string,
    statusId: number
}
interface IStatusManagerDeveloper {
    managerId: string,
    developerId: string,
    statusId: number
}

const APIBASEURL = 'https://localhost:44316/api/Task/GetTasksByStatus';
const FORDDEVELOPERAPIBASEURL = 'https://localhost:44316/api/Task/GetTasksByStatusForDeveloper';

const ManagerDashboard = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userId = user.userId;

    const statusTodo: IStatusManager = { userId: userId, statusId: 1 }
    const statusInProgress: IStatusManager = { userId: userId, statusId: 2 }
    const statusCodeReview: IStatusManager = { userId: userId, statusId: 3 }
    const statusCompleted: IStatusManager = { userId: userId, statusId: 4 }

    const navigate = useNavigate();

    const handleAddTask = () => {
        navigate("/manager/task/addTask");
    }

    const [todoTasks, setTodoTasks] = useState<TaskByStatus[]>([]);
    const [inProgress, setInProgress] = useState<TaskByStatus[]>([]);
    const [codeReview, setCodeReview] = useState<TaskByStatus[]>([]);
    const [completed, setCompleted] = useState<TaskByStatus[]>([]);
    const [developers, setDevelopers] = useState<Developer[]>([]);

    const getDevelopers = () => {

        axios.get('https://localhost:44316/api/Developer/GetAllDevelopers')
            .then(res => {
                setDevelopers(res.data.data)
                getData();
            })
            .catch(err => console.log(err))
    }

    const handleChangeDeveloper = (e: any) => {

        if (e.value) {
            console.log("changed developer - " + e.value);
            debugger
            const statusTodoDeveloper: IStatusManagerDeveloper = { managerId: userId, developerId: e.value, statusId: 1 }
            const statusInProgressDeveloper: IStatusManagerDeveloper = { managerId: userId, developerId: e.value, statusId: 2 }
            const statusCodeReviewDeveloper: IStatusManagerDeveloper = { managerId: userId, developerId: e.value, statusId: 3 }
            const statusCompletedDeveloper: IStatusManagerDeveloper = { managerId: userId, developerId: e.value, statusId: 4 }

            getDataForDeveloper(statusTodoDeveloper,statusInProgressDeveloper,statusCodeReviewDeveloper,statusCompletedDeveloper);
        }
        else {
            getData();
        }
    }

    const getDataForDeveloper = (statusTodoForDev:IStatusManagerDeveloper,statusInProgressDev:IStatusManagerDeveloper,
                                    statusCodeReviewDev:IStatusManagerDeveloper,statusCompletedDev:IStatusManagerDeveloper) => {
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

    useEffect(() => {
        getDevelopers();
    }, []);

    return (
        <div >
            <div className="row">
                <div className="d-flex justify-content-between">
                    <h3 className="manager-dashboard">Manager</h3>
                    <div className='w-50 p-1 mt-2'>
                        <Form.Label className="text-start">Sort By Developer</Form.Label>
                        <Form.Select className='text-center' aria-label="Matter" name="developerId"
                            defaultValue="Select-Developer" onChange={(e) => handleChangeDeveloper(e.target)}>
                            <option value="">All</option>
                            {developers.map((item: Developer) => {
                                return (<option key={item.id} value={item.id} >
                                    {item.firstName} {item.lastName}</option>);
                            })}
                        </Form.Select>
                    </div>
                    <div className="add-task">
                        <Button variant="primary" onClick={handleAddTask}><FaPlus /> Add Task</Button>
                    </div>
                </div>
            </div>
            <div className="m-3">
                <div>
                    <div className="row">
                        <div className="container col m-2 task-list-bg">
                            <h4>To do</h4>
                            {todoTasks.map((element: TaskByStatus, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.developerFirstName} lastName={element.developerLastName}
                                        createdAt={element.createdAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>In progress</h4>
                            {inProgress.map((element: TaskByStatus, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.developerFirstName} lastName={element.developerLastName}
                                        createdAt={element.createdAt} statusId={2} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>Code review</h4>
                            {codeReview.map((element: TaskByStatus, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.developerFirstName} lastName={element.developerLastName}
                                        createdAt={element.createdAt} statusId={3} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>Completed</h4>
                            {completed.map((element: TaskByStatus, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.developerFirstName} lastName={element.developerLastName}
                                        createdAt={element.createdAt} statusId={4} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ManagerDashboard