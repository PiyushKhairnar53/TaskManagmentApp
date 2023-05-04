import React, { createContext } from "react";
import '../../index.css'
import { useState, useEffect } from 'react';
import '../../App.css'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { FaPlus, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TaskByStatus } from "../Task/TaskByStatus";
import TaskItem from "../Task/TaskItem";

interface IStatusManager {
    managerId: string,
    statusId: number
}

export const AppContext = createContext<any>({});
const DeveloperDashboard = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userId = user.userId;

    const statusTodo: IStatusManager = { managerId: userId, statusId: 1 }
    const statusInProgress: IStatusManager = { managerId: userId, statusId: 2 }
    const statusCodeReview: IStatusManager = { managerId: userId, statusId: 3 }
    const statusCompleted: IStatusManager = { managerId: userId, statusId: 4 }


    const navigate = useNavigate();

    const [todoTasks, setTodoTasks] = useState<TaskByStatus[]>([]);
    const [inProgress, setInProgress] = useState<TaskByStatus[]>([]);
    const [codeReview, setCodeReview] = useState<TaskByStatus[]>([]);
    const [completed, setCompleted] = useState<TaskByStatus[]>([]);


    const getData = () => {
        axios.post('https://localhost:44316/api/Task/GetTasksByStatus', statusTodo)
            .then(res => {
                setTodoTasks(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post('https://localhost:44316/api/Task/GetTasksByStatus', statusInProgress)
            .then(res => {
                setInProgress(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post('https://localhost:44316/api/Task/GetTasksByStatus', statusCodeReview)
            .then(res => {
                setCodeReview(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post('https://localhost:44316/api/Task/GetTasksByStatus', statusCompleted)
            .then(res => {
                setCompleted(res.data.data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <AppContext.Provider value={{ getData }}>
            <div className="route-page-bg">
                <div className="m-3">
                    <div>
                        <div className="row">
                            <div className="container col m-2 task-list-bg">
                                <h4>To do</h4>
                                {todoTasks.map((element: TaskByStatus, index) => {
                                    return (
                                        // <div className="col-md-8" key={index}>
                                        <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                            managerId={element.managerId} developerFirstName={element.developerFirstName} developerLastName={element.developerLastName}
                                            createdAt={element.createdAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} />
                                        // </div>
                                    );
                                })}
                            </div>
                            <div className="container col m-2 task-list-bg">
                                <h4>In progress</h4>
                                {inProgress.map((element: TaskByStatus, index) => {
                                    return (
                                        // <div className="col-md-8" key={index}>
                                        <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                            managerId={element.managerId} developerFirstName={element.developerFirstName} developerLastName={element.developerLastName}
                                            createdAt={element.createdAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} />
                                        // </div>
                                    );
                                })}
                            </div>
                            <div className="container col m-2 task-list-bg">
                                <h4>Code review</h4>
                                {codeReview.map((element: TaskByStatus, index) => {
                                    return (
                                        // <div className="col-md-8" key={index}>
                                        <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                            managerId={element.managerId} developerFirstName={element.developerFirstName} developerLastName={element.developerLastName}
                                            createdAt={element.createdAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} />
                                        // </div>
                                    );
                                })}
                            </div>
                            <div className="container col m-2 task-list-bg">
                                <h4>Completed</h4>
                                {completed.map((element: TaskByStatus, index) => {
                                    return (
                                        // <div className="col-md-8" key={index}>
                                        <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                            managerId={element.managerId} developerFirstName={element.developerFirstName} developerLastName={element.developerLastName}
                                            createdAt={element.createdAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} />
                                        // </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AppContext.Provider>
    );
}

export default DeveloperDashboard;