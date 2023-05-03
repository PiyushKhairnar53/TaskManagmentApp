import React from "react";

const TaskItem = (props:any) =>{
    let {title,priority,estimatedTime,managerId,developerFirstName,developerLastName,createdAt} = props;
    const dateOfCreation = new Date(createdAt).toDateString();

    return(
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
            <a target="_blank" className="btn btn-primary">
                Change Status
            </a>
            <p className="card-text">
                <small className="text-muted">Created At - {dateOfCreation}</small>
            </p>
            </div>
        </div>
        </div>
    );
};

export default TaskItem;