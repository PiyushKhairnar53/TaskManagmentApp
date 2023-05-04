import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ChangeStatusModal from "../Status/ChangeStatusModal";

const TaskItem = (props: any) => {
    let { taskId, title,description, priority, estimatedTime, managerId, developerFirstName, 
            developerLastName, createdAt, statusId,developerId,actualTime } = props;
    const dateOfCreation = new Date(createdAt).toDateString();

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleUpdateTask = () => {
        navigate("/manager/task/addTask");

        navigate('/manager/task/addTask',
      {
        state: {
          taskTaskId: taskId,
          taskTitle: title,
          taskDescription:description,
          taskPriority: priority,
          taskEstimatedTime: estimatedTime,
          taskDeveloperId: developerId,
          taskActualTime: actualTime
        }
      });
    };

    const closeModal = (showValue: boolean) => {
        setShow(showValue);
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
                        <label className="card-text text-secondary">Developer Assigned</label>
                        <h6>{developerFirstName} {developerLastName}</h6>
                    </div>
                </div>
                <div className="row mt-0">
                    <div>
                        <button className="btn btn-primary" onClick={handleShow}>
                            Change Status
                        </button>
                    </div>
                </div>
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