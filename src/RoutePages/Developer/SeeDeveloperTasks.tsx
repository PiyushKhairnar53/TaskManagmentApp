import React from "react";
import '../../index.css'
import { useState, useEffect } from 'react';
import '../../App.css'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { TaskByStatusDeveloper } from "../Task/TaskByStatusDeveloper";
import TaskItem from "../Task/TaskItem";
import { useLocation } from "react-router-dom";

interface IStatusManager {
    userId: string,
    statusId: number
}

const APIBASEURL = 'https://localhost:44316/api/Task/GetTasksByStatusDeveloper';


const SeeDeveloperTasks: React.FC = () => {

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

    const [todoTasks, setTodoTasks] = useState<TaskByStatusDeveloper[]>([]);
    const [inProgress, setInProgress] = useState<TaskByStatusDeveloper[]>([]);
    const [codeReview, setCodeReview] = useState<TaskByStatusDeveloper[]>([]);
    const [completed, setCompleted] = useState<TaskByStatusDeveloper[]>([]);

    const getData = () => {
        axios.post(APIBASEURL, statusTodo)
            .then(res => {
                debugger
                setTodoTasks(res.data.data);
            })
            .catch(err => console.log(err))

        axios.post(APIBASEURL, statusInProgress)
            .then(res => {
                debugger
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
                    <h4 className="manager-dashboard">Developer / {userFirstName} {userLastName} </h4>
                </div>
            </div>
            <div className="m-3">
                <div>
                    <div className="row">
                        <div className="container col m-2 task-list-bg">
                            <h4>To do</h4>
                            {todoTasks.map((element: TaskByStatusDeveloper, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName}
                                        createdAt={element.updatedAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>In progress</h4>
                            {inProgress.map((element: TaskByStatusDeveloper, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName}
                                        createdAt={element.updatedAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>Code review</h4>
                            {codeReview.map((element: TaskByStatusDeveloper, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName}
                                        createdAt={element.updatedAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                        <div className="container col m-2 task-list-bg">
                            <h4>Completed</h4>
                            {completed.map((element: TaskByStatusDeveloper, index) => {
                                return (
                                    <TaskItem taskId={element.id} title={element.title} priority={element.priority} estimatedTime={element.estimatedTime} description={element.description}
                                        managerId={element.managerId} firstName={element.managerFirstName} lastName={element.managerLastName}
                                        createdAt={element.updatedAt} statusId={1} developerId={element.developerId} actualTime={element.actualTime} refresh={getData} />
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SeeDeveloperTasks