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
import { TaskByStatusDeveloper } from "../Task/TaskByStatusDeveloper";

interface IStatusManager {
    userId: string,
    statusId: number
}

const APIBASEURL = 'https://localhost:44316/api/Task/GetTasksByStatusDeveloper';

const DeveloperDashboard = () => {

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    const userId = user.userId;

    const statusTodo: IStatusManager = { userId: userId, statusId: 1 }
    const statusInProgress: IStatusManager = { userId: userId, statusId: 2 }
    const statusCodeReview: IStatusManager = { userId: userId, statusId: 3 }
    const statusCompleted: IStatusManager = { userId: userId, statusId: 4 }


    const navigate = useNavigate();

    const [todoTasks, setTodoTasks] = useState<TaskByStatusDeveloper[]>([]);
    const [inProgress, setInProgress] = useState<TaskByStatusDeveloper[]>([]);
    const [codeReview, setCodeReview] = useState<TaskByStatusDeveloper[]>([]);
    const [completed, setCompleted] = useState<TaskByStatusDeveloper[]>([]);


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
        getData();
    }, []);

    return (
            <div className="route-page-bg">
                <div className="m-3">
                    <div>
                        <div className="row">
                            <div className="container col m-2 task-list-bg">
                                <h4>To do</h4>
                                {todoTasks.map((element: TaskByStatusDeveloper, index) => {
                                    return (
                                        // <div className="col-md-8" key={index}>
                                        <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                            managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName}
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
                                        managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName}
                                        createdAt={element.updatedAt} statusId={2} actualTime={element.actualTime} refresh={getData}  />
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
                                        managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName}
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
                                        managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName}
                                        createdAt={element.updatedAt} statusId={4} actualTime={element.actualTime} refresh={getData}  />
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