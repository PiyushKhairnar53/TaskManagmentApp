import React from "react";
import '../../index.css'
import { useState, useEffect } from 'react';
import '../../App.css'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { TaskByStatus } from "../Task/TaskByStatus";
import TaskItem from "../Task/TaskItem";
import { useLocation } from "react-router-dom";
import { Form } from "react-bootstrap";

interface IStatusManager {
    userId: string,
    statusId: number
}

const APIBASEURL = 'https://localhost:44316/api/Task/GetTasksByStatus';

const SeeManagerTasks: React.FC = () => {

    var userId: string = '';
    var userFirstName: string = '';
    var userLastName: string = '';
    var userRole: string = '';


    const location = useLocation();
    if (location.state != null) {
        userId = location.state.targetUserId
        userFirstName = location.state.targetUserFirstName
        userLastName = location.state.targetUserLastName
        userRole = location.state.targetUserRole
    }

    const statusTodo: IStatusManager = { userId: userId, statusId: 1 }
    const statusInProgress: IStatusManager = { userId: userId, statusId: 2 }
    const statusCodeReview: IStatusManager = { userId: userId, statusId: 3 }
    const statusCompleted: IStatusManager = { userId: userId, statusId: 4 }

    const [todoTasks, setTodoTasks] = useState<TaskByStatus[]>([]);
    const [inProgress, setInProgress] = useState<TaskByStatus[]>([]);
    const [codeReview, setCodeReview] = useState<TaskByStatus[]>([]);
    const [completed, setCompleted] = useState<TaskByStatus[]>([]);

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
                <div className="row mt-0">
                        <div className="d-flex justify-content-between">
                            <h4 className="manager-dashboard">Manager / {userFirstName} {userLastName}</h4>
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
                                        managerId={element.managerId} firstName={element.developerFirstName} lastName={element.developerLastName} frontUserRole={'Manager'}
                                        createdAt={element.createdAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>In progress</h4>
                            {inProgress.map((element: TaskByStatus, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.developerFirstName} lastName={element.developerLastName} frontUserRole={'Manager'}
                                        createdAt={element.createdAt} statusId={2} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>Code review</h4>
                            {codeReview.map((element: TaskByStatus, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.developerFirstName} lastName={element.developerLastName} frontUserRole={'Manager'}
                                        createdAt={element.createdAt} statusId={3} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>Completed</h4>
                            {completed.map((element: TaskByStatus, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.developerFirstName} lastName={element.developerLastName} frontUserRole={'Manager'}
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

export default SeeManagerTasks