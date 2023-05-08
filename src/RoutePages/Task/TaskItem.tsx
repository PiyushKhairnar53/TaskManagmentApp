import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ChangeStatusModal from "../Status/ChangeStatusModal";

const TaskItem = (props: any) => {
    let { taskId, title, description, priority, estimatedTime, managerId, firstName,
        lastName, createdAt, statusId, developerId, actualTime, refresh } = props;
    const dateOfCreation = new Date(createdAt).toDateString();

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("User") || '{}');
    console.log("userId --" + user.userId);
    console.log("managerId -- "+managerId);
    console.log("developerI -- "+developerId);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        refresh = true;
    }

    const handleUpdateTask = () => {

        if(user.userId === managerId || user.userId === developerId){

        console.log('user role in taskitem -'+user.role);

        if (user.role === 'Manager') {
            navigate('/manager/task/addTask',
                {
                    state: {
                        taskTaskId: taskId,
                        taskTitle: title,
                        taskDescription: description,
                        taskPriority: priority,
                        taskEstimatedTime: estimatedTime,
                        taskDeveloperId: developerId,
                        taskActualTime: actualTime,
                        taskManagerId: managerId
                    }
                });
        }

        if (user.role === 'Developer') {
            navigate('/developer/task/updateTask',
                {
                    state: {
                        taskTaskId: taskId,
                        taskTitle: title,
                        taskDescription: description,
                        taskPriority: priority,
                        taskFirstName:firstName,
                        taskLastName:lastName,
                        taskEstimatedTime: estimatedTime,
                        taskDeveloperId: developerId,
                        taskActualTime: actualTime,
                        taskManagerId: managerId
                    }
                });
        }
    }
    };

    const closeModal = (showValue: boolean) => {
        setShow(showValue);
        refresh(true);
    }

    const handleShow = () => setShow(true);

    return (
        <div className="my-4">
            <div className="card"  >
                <div className="card-body mb-0" onClick={handleUpdateTask}>
                    <h5 className="card-title">{title}</h5>
                    <div className="row">
                        <div className="col">
                            <label className="card-text text-secondary">Priority</label>
                            <h6>{priority}</h6>
                        </div>
                        <div className="col">
                            <label className="card-text text-secondary">Estimate</label>
                            <h6>{estimatedTime} hrs</h6>
                        </div>
                    </div>
                    <div className="row">
                        {user.role == 'Manager' && <label className="card-text text-secondary">Developer Assigned</label>}
                        {user.role == 'Developer' && <label className="card-text text-secondary">Assigned by Manager</label>}
                        <h6>{firstName} {lastName}</h6>
                    </div>
                </div>
                {(user.userId == managerId || user.userId == developerId) &&    
                <div className="row mt-0">
                    <div>
                        <button className="btn btn-primary btn-change-status" onClick={handleShow}>
                           <small ><FaPencilAlt className="edit-status btn-change-status"/></small> Change Status
                        </button>
                    </div>
                </div>}
                <div className="row mt-1 mb-2">
                    <p className="card-text button-font-size text-muted">
                        <small>Updated At - {dateOfCreation}</small>
                    </p>
                </div>
            </div>

             <Modal show={show} onHide={handleClose}>
                <ChangeStatusModal ShowModal={closeModal} TaskId={taskId} Title={title} StatusId={statusId} />
            </Modal>
            
        </div>
    );
};

export default TaskItem;