import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from 'react';
import ChangeStatusModal from "../Status/ChangeStatusModal";

const DeveloperItem = (props: any) => {
    let {taskId, title, priority, estimatedTime, managerId, developerFirstName, developerLastName, createdAt,statusId } = props;
    const dateOfCreation = new Date(createdAt).toDateString();

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const closeModal = (showValue: boolean) => {
        setShow(showValue);
    }

    const handleShow = () => setShow(true);

    return (
        <div className="my-4">
            <div className="card">
                <div className="card-body">
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
                    <div className="row">
                        <div>
                            <button className="btn btn-primary" onClick={handleShow}>
                                <small className="button-font-size">Change Status</small>
                            </button>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <p className="card-text button-font-size text-muted">
                            <small className="">Updated At - {dateOfCreation}</small>
                        </p>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <ChangeStatusModal ShowModal={closeModal} TaskId={taskId} Title={title} StatusId={statusId} />
            </Modal>
        </div>
    );
};

export default DeveloperItem;